const http = require('http');
const WebSocket = require('ws');

async function main() {
  // Get the aiapisave tab (not held by xbrowser)
  const wsUrl = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        try {
          const pages = JSON.parse(body);
          const target = pages.find(p => p.url && p.url.includes('aiapisave.xyz/console'));
          if (!target) return reject(new Error('No aiapisave tab'));
          resolve(target.webSocketDebuggerUrl);
        } catch(e) { reject(e); }
      });
    }).on('error', reject);
  });
  
  console.log('Connecting to aiapisave tab');
  const ws = new WebSocket(wsUrl);
  await new Promise(r => ws.on('open', r));
  console.log('Connected');

  function sendCmd(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).slice(2);
      const t = setTimeout(() => reject(new Error('timeout:' + method)), 10000);
      const h = (data) => {
        try {
          const r = JSON.parse(data.toString());
          if (r.id === id) {
            clearTimeout(t); ws.removeListener('message', h);
            if (r.error) reject(new Error(JSON.stringify(r.error)));
            else resolve(r.result);
          }
        } catch(e) {}
      };
      ws.on('message', h);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  // Enable Runtime
  await sendCmd('Runtime.enable');
  console.log('Runtime enabled');

  // Navigate to GitHub OAuth settings
  const nav = await sendCmd('Page.navigate', { url: 'https://github.com/settings/applications/3662178' });
  console.log('Navigate result:', nav?.result?.type || 'ok');

  // Wait for load
  await new Promise((resolve) => {
    const h = (data) => {
      try {
        const r = JSON.parse(data.toString());
        if (r.method === 'Page.loadEventFired') {
          ws.removeListener('message', h);
          console.log('Page loaded');
          setTimeout(resolve, 1500);
        }
      } catch(e) {}
    };
    ws.on('message', h);
  });

  // Check current state
  const title = await sendCmd('Runtime.evaluate', { expression: 'document.title' });
  console.log('Title:', title?.result?.value);

  // Update callback URL
  const r1 = await sendCmd('Runtime.evaluate', {
    expression: `
      (() => {
        const inputs = document.querySelectorAll('input[type="text"]');
        for (const el of inputs) {
          if (el.value && el.value.includes('aiapisave.xyz')) {
            const newCB = 'https://www.aiapisave.xyz/api/auth/callback/github';
            if (el.value.includes(newCB)) return 'ALREADY_EXISTS:' + el.value;
            const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
            setter.call(el, el.value + '\\n' + newCB);
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
            return 'UPDATED:' + el.value.replace(/\\n/g,'|');
          }
        }
        const all = Array.from(inputs).map(i=>i.id+'='+i.value.substring(0,40)).join(',');
        return 'NOT_FOUND. Inputs: ' + all;
      })()
    `
  });
  console.log('Update CB:', r1?.result?.value);

  // Click Update
  const r2 = await sendCmd('Runtime.evaluate', {
    expression: `
      (() => {
        const btns = document.querySelectorAll('button');
        for (const b of btns) {
          if (b.textContent.trim() === 'Update application' && !b.disabled) {
            b.click();
            return 'CLICKED';
          }
        }
        return 'NOBTN.' + Array.from(btns).map(b=>b.textContent.trim().substring(0,30)).join(',');
      })()
    `
  });
  console.log('Click:', r2?.result?.value);

  await new Promise(r => setTimeout(r, 3000));

  // Check result
  const r3 = await sendCmd('Runtime.evaluate', {
    expression: `
      (() => {
        const alerts = document.querySelectorAll('[role="alert"], .flash');
        for (const a of alerts) {
          const t = a.textContent.trim();
          if (t.length > 3) return 'ALERT:' + t.substring(0, 200);
        }
        return 'URL:' + window.location.href + ' TITLE:' + document.title;
      })()
    `
  });
  console.log('Result:', r3?.result?.value);

  ws.close();
  process.exit(0);
}

main().catch(err => { console.error('ERROR:', err.message); process.exit(1); });
