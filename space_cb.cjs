const http = require('http');
const WebSocket = require('ws');

async function main() {
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

  const ws = new WebSocket(wsUrl);
  await new Promise(r => ws.on('open', r));
  console.log('Connected');

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const myId = id++;
      const t = setTimeout(() => reject(new Error('timeout:'+method)), 8000);
      const h = (data) => {
        try {
          const r = JSON.parse(data.toString());
          if (r.id === myId) {
            clearTimeout(t);
            ws.removeListener('message', h);
            if (r.error) reject(new Error(JSON.stringify(r.error)));
            else resolve(r.result);
          }
        } catch {}
      };
      ws.on('message', h);
      ws.send(JSON.stringify({ id: myId, method, params }));
    });
  }

  // First check current value
  const r0 = await send('Runtime.evaluate', { expression: `
    (() => {
      const inputs = document.querySelectorAll('input[type="text"]');
      for (const el of inputs) {
        if (el.value && el.value.includes('aiapisave.xyz')) return el.value;
      }
      return 'NF';
    })()
  `});
  console.log('Current:', r0?.result?.value);

  // Set both URLs separated by space (GitHub supports this)
  const newVal = 'https://api.aiapisave.xyz/oauth/github https://www.aiapisave.xyz/api/auth/callback/github';
  const r1 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const inputs = document.querySelectorAll('input[type="text"]');
        for (const el of inputs) {
          if (el.value && el.value.includes('aiapisave.xyz')) {
            const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
            setter.call(el, '${newVal}');
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
            return 'SET';
          }
        }
        return 'NF';
      })()
    `
  });
  console.log('Set:', r1?.result?.value);

  // Click update
  const r2 = await send('Runtime.evaluate', { expression: `
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
  `});
  console.log('Click:', r2?.result?.value);

  await new Promise(r => setTimeout(r, 5000));

  // Check result
  const r3 = await send('Runtime.evaluate', { expression: `
    (() => {
      const alerts = document.querySelectorAll('[role="alert"], .flash');
      for (const a of alerts) {
        const t = a.textContent.trim();
        if (t.length > 5) return 'ALERT:' + t.substring(0, 300);
      }
      const inputs = document.querySelectorAll('input[type="text"]');
      for (const el of inputs) {
        if (el.value && el.value.includes('aiapisave.xyz')) return 'CB:' + el.value;
      }
      return 'URL:' + window.location.href;
    })()
  `});
  console.log('Final:', r3?.result?.value);

  ws.close();
  process.exit(0);
}

main().catch(err => { console.error('ERROR:', err.message); process.exit(1); });
