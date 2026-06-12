const http = require('http');
const WebSocket = require('ws');

// Get the GitHub settings tab WS URL
async function getGitHubWS() {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        try {
          const pages = JSON.parse(body);
          const target = pages.find(p => p.url && p.url.includes('github.com/settings'));
          if (!target) return reject(new Error('No GitHub settings tab'));
          resolve(target.webSocketDebuggerUrl);
        } catch(e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function sendCmd(ws, method, params = {}, timeout = 8000) {
  return new Promise((resolve, reject) => {
    const id = Math.random().toString(36).slice(2);
    const msg = JSON.stringify({ id, method, params });
    const timer = setTimeout(() => reject(new Error(`timeout: ${method}`)), timeout);
    const handler = (data) => {
      try {
        const r = JSON.parse(data.toString());
        if (r.id === id) {
          clearTimeout(timer);
          ws.removeListener('message', handler);
          if (r.error) reject(new Error(`${method}: ${JSON.stringify(r.error)}`));
          else resolve(r.result);
        }
      } catch(e) {}
    };
    ws.on('message', handler);
    ws.send(msg);
  });
}

async function main() {
  const wsUrl = await getGitHubWS();
  console.log('WS URL:', wsUrl.substring(0, 60) + '...');
  
  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('ws connect timeout')), 5000);
    ws.on('open', () => { clearTimeout(t); resolve(); });
    ws.on('error', (e) => { clearTimeout(t); reject(e); });
  });
  console.log('WS connected');

  // Enable Runtime
  await sendCmd(ws, 'Runtime.enable');
  console.log('Runtime enabled');

  // Update callback URL
  const r1 = await sendCmd(ws, 'Runtime.evaluate', {
    expression: `
      (() => {
        const inputs = document.querySelectorAll('input[type="text"]');
        for (const el of inputs) {
          if (el.value && el.value.includes('aiapisave.xyz')) {
            const newCB = 'https://www.aiapisave.xyz/api/auth/callback/github';
            if (el.value.includes(newCB)) return 'ALREADY_EXISTS';
            const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
            setter.call(el, el.value + '\\n' + newCB);
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
            return 'UPDATED';
          }
        }
        return 'NOT_FOUND';
      })()
    `
  });
  console.log('Update CB:', r1?.result?.value);

  // Click update
  const r2 = await sendCmd(ws, 'Runtime.evaluate', {
    expression: `
      (() => {
        const btns = document.querySelectorAll('button');
        for (const b of btns) {
          if (b.textContent.trim() === 'Update application' && !b.disabled) {
            b.click();
            return 'CLICKED';
          }
        }
        return 'NOBTN';
      })()
    `
  });
  console.log('Click:', r2?.result?.value);

  // Wait and check
  await new Promise(r => setTimeout(r, 3000));

  const r3 = await sendCmd(ws, 'Runtime.evaluate', {
    expression: `
      (() => {
        const alerts = document.querySelectorAll('[role="alert"], .flash, .flash-success, .flash-error');
        for (const a of alerts) {
          const t = a.textContent.trim();
          if (t.length > 5) return 'ALERT:' + t.substring(0, 200);
        }
        const inputs = document.querySelectorAll('input[type="text"]');
        for (const el of inputs) {
          if (el.value && el.value.includes('aiapisave.xyz')) return el.value;
        }
        return document.title;
      })()
    `
  });
  console.log('Result:', r3?.result?.value);

  ws.close();
  process.exit(0);
}

main().catch(err => { console.error('ERROR:', err.message); process.exit(1); });
