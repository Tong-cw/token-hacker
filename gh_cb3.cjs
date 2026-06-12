const http = require('http');
const WebSocket = require('ws');

async function getWSUrl() {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        try {
          const pages = JSON.parse(body);
          const target = pages.find(p => p.url && p.url.includes('github.com/settings'));
          if (!target) throw new Error('No GitHub settings tab');
          resolve(target.webSocketDebuggerUrl);
        } catch(e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function sendCmd(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.random().toString(36).slice(2);
    ws.send(JSON.stringify({ id, method, params }));
    const timer = setTimeout(() => { ws.removeListener('message', handler); reject(new Error('timeout')); }, 5000);
    const handler = (data) => {
      try {
        const r = JSON.parse(data.toString());
        if (r.id === id) {
          clearTimeout(timer);
          ws.removeListener('message', handler);
          if (r.error) reject(new Error(JSON.stringify(r.error)));
          else resolve(r.result);
        }
      } catch {}
    };
    ws.on('message', handler);
  });
}

async function main() {
  const wsUrl = await getWSUrl();
  console.log('Connected to GitHub tab');
  const ws = new WebSocket(wsUrl);
  await new Promise(r => ws.on('open', r));

  // Find and update callback URL input
  const r1 = await sendCmd(ws, 'Runtime.evaluate', {
    expression: `
      (function() {
        const inputs = document.querySelectorAll('input[type="text"]');
        for (const el of inputs) {
          if (el.value && el.value.includes('aiapisave.xyz')) {
            const newCB = 'https://www.aiapisave.xyz/api/auth/callback/github';
            if (el.value.includes(newCB)) return 'ALREADY_EXISTS';
            const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
            setter.call(el, el.value + '\\n' + newCB);
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
            return 'UPDATED:' + el.value.replace(/\\n/g, ' | ');
          }
        }
        return 'NOT_FOUND';
      })()
    `
  });
  console.log('Step 1 - Update callback:', r1?.result?.value || 'N/A');

  // Click Update button
  const r2 = await sendCmd(ws, 'Runtime.evaluate', {
    expression: `
      (function() {
        const btns = document.querySelectorAll('button');
        for (const b of btns) {
          if (b.textContent.trim() === 'Update application' && !b.disabled) {
            b.click();
            return 'CLICKED';
          }
        }
        return 'NO_BTN';
      })()
    `
  });
  console.log('Step 2 - Click update:', r2?.result?.value || 'N/A');

  // Wait 3s and check result
  await new Promise(r => setTimeout(r, 3000));

  const r3 = await sendCmd(ws, 'Runtime.evaluate', {
    expression: `(function() {
      // Check if we see success flash message
      const flashes = document.querySelectorAll('[role="alert"], .flash');
      for (const f of flashes) return 'FLASH:' + f.textContent.trim().substring(0, 200);
      const inputs = document.querySelectorAll('input[type="text"]');
      for (const el of inputs) {
        if (el.value && el.value.includes('aiapisave.xyz')) return 'CB_URL:' + el.value.replace(/\\n/g, ' | ');
      }
      return 'URL:' + window.location.href + ' TITLE:' + document.title;
    })()`
  });
  console.log('Step 3 - Result:', r3?.result?.value || 'N/A');

  ws.close();
  console.log('DONE');
  process.exit(0);
}

main().catch(err => { console.error('ERR:', err.message); process.exit(1); });
