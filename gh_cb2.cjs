const http = require('http');
const WebSocket = require('ws');

async function getWSUrl() {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        const pages = JSON.parse(body);
        const target = pages.find(p => p.url && p.url.includes('aiapisave.xyz/console'));
        if (!target) reject(new Error('No target tab'));
        else resolve(target.webSocketDebuggerUrl);
      });
    }).on('error', reject);
  });
}

function sendCmd(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.random().toString(36).slice(2);
    ws.send(JSON.stringify({ id, method, params }));
    const handler = (data) => {
      const r = JSON.parse(data.toString());
      if (r.id === id) {
        ws.removeListener('message', handler);
        if (r.error) reject(new Error(JSON.stringify(r.error)));
        else resolve(r.result);
      }
    };
    ws.on('message', handler);
  });
}

async function main() {
  const wsUrl = await getWSUrl();
  console.log('WS:', wsUrl.substring(0, 80), '...');
  const ws = new WebSocket(wsUrl);
  await new Promise(r => ws.on('open', r));

  // Navigate
  const nav = await sendCmd(ws, 'Page.navigate', { url: 'https://github.com/settings/applications/3662178' });
  console.log('Navigate result:', JSON.stringify(nav));

  // Wait for load
  await new Promise(r => {
    const handler = (data) => {
      try {
        const msg = JSON.parse(data.toString());
        if (msg.method === 'Page.loadEventFired') {
          ws.removeListener('message', handler);
          setTimeout(r, 1000);
        }
      } catch {}
    };
    ws.on('message', handler);
    sendCmd(ws, 'Page.enable');
  });

  const url = await sendCmd(ws, 'Runtime.evaluate', { expression: 'window.location.href' });
  console.log('Current URL:', url?.result?.value || 'N/A');

  const title = await sendCmd(ws, 'Runtime.evaluate', { expression: 'document.title' });
  console.log('Title:', title?.result?.value || 'N/A');

  // Get inputs with aiapisave
  const inputs = await sendCmd(ws, 'Runtime.evaluate', {
    expression: `JSON.stringify(Array.from(document.querySelectorAll('input, textarea')).map((el,i) => ({
      i, tag: el.tagName, type: el.type, id: el.id, name: el.name,
      val: (el.value||'').substring(0,80), ph: (el.placeholder||'')
    })).filter(x => x.val.includes('aiapisave') || x.ph.includes('callback')))`
  });
  console.log('Callback inputs:', inputs?.result?.value || 'N/A');

  // Try to update
  const update = await sendCmd(ws, 'Runtime.evaluate', {
    expression: `
      (function() {
        const els = document.querySelectorAll('input[type="text"], input[type="url"], textarea');
        let found = false;
        for (const el of els) {
          if (el.value && el.value.includes('aiapisave.xyz')) {
            const newCB = 'https://www.aiapisave.xyz/api/auth/callback/github';
            if (!el.value.includes(newCB)) {
              const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
              setter.call(el, el.value + '\\n' + newCB);
              el.dispatchEvent(new Event('input', { bubbles: true }));
              el.dispatchEvent(new Event('change', { bubbles: true }));
              found = true;
              return JSON.stringify({ ok: true, old: el.value.split('\\n')[0], added: newCB });
            }
            return JSON.stringify({ ok: true, exists: true, val: el.value });
          }
        }
        return JSON.stringify({ ok: false, reason: 'no aiapisave input', totalInputs: els.length });
      })()
    `
  });
  console.log('Update result:', update?.result?.value || 'N/A');

  // Click update button
  const click = await sendCmd(ws, 'Runtime.evaluate', {
    expression: `
      (function() {
        const btns = document.querySelectorAll('button[type="submit"], button');
        for (const b of btns) {
          const t = (b.textContent||'').trim().toLowerCase();
          if ((t.includes('update') || t.includes('save')) && !b.disabled) {
            b.click();
            return JSON.stringify({ clicked: true, text: t });
          }
        }
        const all = Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim().substring(0, 30));
        return JSON.stringify({ clicked: false, buttons: all });
      })()
    `
  });
  console.log('Click result:', click?.result?.value || 'N/A');

  await new Promise(r => setTimeout(r, 3000));

  const finalUrl = await sendCmd(ws, 'Runtime.evaluate', { expression: 'window.location.href' });
  console.log('Final URL:', finalUrl?.result?.value || 'N/A');

  const body = await sendCmd(ws, 'Runtime.evaluate', { expression: 'document.body.innerText.substring(0, 500)' });
  console.log('Body:', body?.result?.value || 'N/A');

  ws.close();
  process.exit(0);
}

main().catch(err => { console.error('ERR:', err.message); process.exit(1); });
