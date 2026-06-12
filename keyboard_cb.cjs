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

  // Domains not needed - go directly
  console.log('Ready');

  // Focus the callback URL field
  await send('Runtime.evaluate', { expression: `
    (() => {
      const inputs = document.querySelectorAll('input[type="text"]');
      for (const el of inputs) {
        if (el.value && el.value.includes('aiapisave.xyz')) {
          el.focus();
          el.select();
          return 'FOCUSED';
        }
      }
      return 'NF';
    })()
  `});
  console.log('Focused');

  // Select all and delete
  await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Backspace', code: 'Backspace', windowsVirtualKeyCode: 8 });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Backspace', code: 'Backspace', windowsVirtualKeyCode: 8 });
  console.log('Deleted old value');

  // Type first URL
  const url1 = 'https://api.aiapisave.xyz/oauth/github';
  for (const ch of url1) {
    await send('Input.insertText', { text: ch });
  }
  console.log('Typed URL 1');

  // Press Enter for newline
  await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, unmodifiedText: '\r' });
  await send('Input.dispatchKeyEvent', { type: 'char', text: '\r' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
  console.log('Pressed Enter');

  // Type second URL
  const url2 = 'https://www.aiapisave.xyz/api/auth/callback/github';
  for (const ch of url2) {
    await send('Input.insertText', { text: ch });
  }
  console.log('Typed URL 2');

  // Trigger events
  await send('Runtime.evaluate', { expression: `
    (() => {
      const inputs = document.querySelectorAll('input[type="text"]');
      for (const el of inputs) {
        if (el.value && el.value.includes('aiapisave.xyz')) {
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
          return 'TRIGGERED:' + el.value.replace(/\\n/g, '|NL|').substring(0, 100);
        }
      }
      return 'NF';
    })()
  `});

  // Verify
  const r1 = await send('Runtime.evaluate', { expression: `
    (() => {
      const inputs = document.querySelectorAll('input[type="text"]');
      for (const el of inputs) {
        if (el.value && el.value.includes('aiapisave.xyz')) {
          return el.value.replace(/[\\n\\r]+/g, ' | ');
        }
      }
      return 'NF';
    })()
  `});
  console.log('Current value:', r1?.result?.value);

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
      return Array.from(document.querySelectorAll('button')).map(b=>b.textContent.trim().substring(0,30)).join(',');
    })()
  `});
  console.log('Click:', r2?.result?.value);

  await new Promise(r => setTimeout(r, 5000));

  // Final check
  const r3 = await send('Runtime.evaluate', { expression: `
    (() => {
      const alerts = document.querySelectorAll('[role="alert"], .flash, .flash-full');
      for (const a of alerts) {
        const t = a.textContent.trim();
        if (t.length > 5 && !t.includes('signed in') && !t.includes('switched accounts')) return 'ALERT:' + t.substring(0, 200);
      }
      const inputs = document.querySelectorAll('input[type="text"]');
      for (const el of inputs) {
        if (el.value && el.value.includes('aiapisave.xyz')) return 'CB:' + el.value.replace(/[\\n\\r]+/g, ' | ');
      }
      return 'URL:' + window.location.href;
    })()
  `});
  console.log('Final:', r3?.result?.value);

  ws.close();
  process.exit(0);
}

main().catch(err => { console.error('ERROR:', err.message); process.exit(1); });
