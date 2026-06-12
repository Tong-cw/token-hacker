const http = require('http');
const WebSocket = require('ws');

async function main() {
  // Get WS URL for the GitHub tab
  const wsUrl = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        try {
          const pages = JSON.parse(body);
          const target = pages.find(p => p.url && p.url.includes('github.com/settings'));
          if (!target) return reject(new Error('No GitHub tab'));
          resolve(target.webSocketDebuggerUrl);
        } catch(e) { reject(e); }
      });
    }).on('error', reject);
  });

  console.log('WS:', wsUrl.substring(0, 70));

  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('connect timeout')), 5000);
    ws.on('open', () => { clearTimeout(t); resolve(); });
    ws.on('error', reject);
  });
  console.log('Connected');

  let msgId = 1;
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      const t = setTimeout(() => reject(new Error('T/O:' + method)), 8000);
      const h = (data) => {
        try {
          const r = JSON.parse(data.toString());
          if (r.id === id) {
            clearTimeout(t);
            ws.removeListener('message', h);
            if (r.error) reject(new Error(JSON.stringify(r.error)));
            else resolve(r.result);
          }
        } catch {}
      };
      ws.on('message', h);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  console.log('Step 1: update callback URL');
  const r1 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const inputs = document.querySelectorAll('input[type="text"]');
        let found = null;
        for (const el of inputs) {
          if (el.value && el.value.includes('aiapisave.xyz')) { found = el; break; }
        }
        if (!found) return 'NOT_FOUND';
        const newCB = 'https://www.aiapisave.xyz/api/auth/callback/github';
        const target = 'https://api.aiapisave.xyz/oauth/github\\n' + newCB;
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
        setter.call(found, target);
        found.dispatchEvent(new Event('input', { bubbles: true }));
        found.dispatchEvent(new Event('change', { bubbles: true }));
        return 'OK';
      })()
    `
  });
  console.log('CB update:', r1?.result?.value);

  console.log('Step 2: click Update application');
  const r2 = await send('Runtime.evaluate', {
    expression: `
      (() => {
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
  console.log('Click:', r2?.result?.value);

  await new Promise(r => setTimeout(r, 5000));

  console.log('Step 3: verify result');
  const r3 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const alerts = document.querySelectorAll('[role="alert"], .flash, .flash-full');
        for (const a of alerts) {
          const t = a.textContent.trim();
          if (t.length > 5) return 'ALERT: ' + t.substring(0, 300);
        }
        return 'URL: ' + window.location.href;
      })()
    `
  });
  console.log('Result:', r3?.result?.value);

  ws.close();
  console.log('DONE');
  process.exit(0);
}

main().catch(err => { console.error('ERROR:', err.message); process.exit(1); });
