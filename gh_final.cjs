const http = require('http');
const WebSocket = require('ws');

async function main() {
  // Create a fresh tab via CDP REST API
  const newTab = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json/new', (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => { try { resolve(JSON.parse(body)); } catch(e) { reject(e); } });
    }).on('error', reject);
  });
  console.log('New tab WS:', newTab.webSocketDebuggerUrl.substring(0, 60) + '...');

  const ws = new WebSocket(newTab.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('ws connect timeout')), 5000);
    ws.on('open', () => { clearTimeout(t); resolve(); });
    ws.on('error', reject);
  });
  console.log('WS connected');

  // Check if Page domain works first
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).slice(2);
      const t = setTimeout(() => reject(new Error('timeout:' + method)), 15000);
      const h = (data) => {
        try {
          const r = JSON.parse(data.toString());
          if (r.id === id) {
            clearTimeout(t); ws.removeListener('message', h);
            if (r.error) reject(new Error(method + ': ' + JSON.stringify(r.error)));
            else resolve(r.result);
          }
        } catch(e) {}
      };
      ws.on('message', h);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  // Navigate directly
  const nav = await send('Page.navigate', { url: 'https://github.com/settings/applications/3662178' });
  console.log('Nav:', nav?.frameId ? 'OK' : JSON.stringify(nav));

  // Wait for page load
  await new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('load timeout')), 20000);
    const h = (data) => {
      try {
        const r = JSON.parse(data.toString());
        if (r.method === 'Page.loadEventFired') {
          clearTimeout(t); ws.removeListener('message', h);
          console.log('Loaded');
          setTimeout(resolve, 1500);
        }
      } catch(e) {}
    };
    ws.on('message', h);
  });

  // Enable Runtime domain
  await send('Runtime.enable');
  console.log('Runtime enabled');

  // Get page title
  const t = await send('Runtime.evaluate', { expression: 'document.title' });
  console.log('Title:', t?.result?.value);

  // Find and update callback URL field
  const r1 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const inputs = document.querySelectorAll('input[type="text"]');
        let found = null;
        for (const el of inputs) {
          if (el.value && el.value.includes('aiapisave.xyz')) {
            found = el;
            break;
          }
        }
        if (!found) {
          const all = Array.from(inputs).map(i => i.value.substring(0, 40)).join(' | ');
          return 'NOT_FOUND: ' + all;
        }
        const newCB = 'https://www.aiapisave.xyz/api/auth/callback/github';
        if (found.value.includes(newCB)) return 'ALREADY_EXISTS';
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
        setter.call(found, found.value + '\\n' + newCB);
        found.dispatchEvent(new Event('input', { bubbles: true }));
        found.dispatchEvent(new Event('change', { bubbles: true }));
        return 'UPDATED: ' + found.value.replace(/\\n/g, ' | ');
      })()
    `
  });
  console.log('Update CB:', r1?.result?.value);

  // Click update button
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
        const all = Array.from(btns).map(b => b.textContent.trim().substring(0, 30)).join(', ');
        return 'NO_BTN: ' + all;
      })()
    `
  });
  console.log('Click:', r2?.result?.value);

  await new Promise(r => setTimeout(r, 4000));

  // Check result
  const r3 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const alerts = document.querySelectorAll('[role="alert"], .flash');
        for (const a of alerts) {
          const t = a.textContent.trim();
          if (t.length > 3) return 'ALERT: ' + t.substring(0, 300);
        }
        const inputs = document.querySelectorAll('input[type="text"]');
        for (const el of inputs) {
          if (el.value && el.value.includes('aiapisave.xyz')) return 'INPUT: ' + el.value.replace(/\\n/g, ' | ');
        }
        return 'URL: ' + window.location.href + ' TITLE: ' + document.title;
      })()
    `
  });
  console.log('Result:', r3?.result?.value);

  ws.close();
  process.exit(0);
}

main().catch(err => { console.error('ERROR:', err.message); process.exit(1); });
