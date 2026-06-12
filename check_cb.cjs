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

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const myId = id++;
      const t = setTimeout(() => reject(new Error('timeout')), 8000);
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

  // Get callback URL value
  const r = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const inputs = document.querySelectorAll('input');
        for (const el of inputs) {
          if (el.value && el.value.includes('aiapisave.xyz')) return el.value;
        }
        return 'NOT_FOUND';
      })()
    `
  });
  console.log('Callback URL:', r?.result?.value);

  ws.close();
  process.exit(0);
}

main().catch(err => { console.error('ERROR:', err.message); process.exit(1); });
