const http = require('http');
const WS_HOST = '127.0.0.1';
const WS_PORT = 9222;

async function getWSUrl() {
  return new Promise((resolve, reject) => {
    http.get(`http://${WS_HOST}:${WS_PORT}/json`, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        const pages = JSON.parse(body);
        // Find a regular page to use for navigation
        const target = pages.find(p => p.url && !p.url.startsWith('chrome://') && !p.url.startsWith('chrome-untrusted://') && !p.url.includes('ogs.google.com'));
        if (!target) reject(new Error('No usable tab. Pages: ' + JSON.stringify(pages.map(p => p.url))));
        else resolve(target.webSocketDebuggerUrl);
      });
    }).on('error', reject);
  });
}

function sendCmd(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.random().toString(36).slice(2);
    const msg = JSON.stringify({ id, method, params });
    ws.send(msg);
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
  const WebSocket = require('ws');
  const wsUrl = await getWSUrl();
  console.log('Connecting to:', wsUrl);

  const ws = new WebSocket(wsUrl);
  await new Promise(r => ws.on('open', r));

  // Navigate to GitHub OAuth settings
  await sendCmd(ws, 'Page.navigate', { url: 'https://github.com/settings/applications/3662178' });
  console.log('Navigated to OAuth App settings');
  await new Promise(r => setTimeout(r, 5000));

  // Check if we hit a login or sudo page
  const bodyText = await sendCmd(ws, 'Runtime.evaluate', { expression: 'document.body.innerText.substring(0, 800)' });
  console.log('Page text:', bodyText?.result?.value || 'N/A');

  // Check for sudo mode password prompt
  const sudoCheck = await sendCmd(ws, 'Runtime.evaluate', {
    expression: `(function() {
      const inputs = document.querySelectorAll('input[type="password"]');
      const results = [];
      inputs.forEach((el, i) => results.push({ index: i, id: el.id, name: el.name, placeholder: el.placeholder }));
      return JSON.stringify({ sudoInputs: results, title: document.title });
    })()`
  });
  console.log('Sudo check:', sudoCheck?.result?.value || 'N/A');

  // Check if we're on the settings page or need to authenticate
  const pageTitle = await sendCmd(ws, 'Runtime.evaluate', { expression: 'document.title' });
  console.log('Page title:', pageTitle?.result?.value || 'N/A');

  // If page requires re-authentication (sudo mode), try to handle it
  const isSettingsPage = await sendCmd(ws, 'Runtime.evaluate', {
    expression: `(function() {
      const hasCallbackField = document.querySelector('input[value*="aiapisave"]') !== null;
      const hasUpdateBtn = Array.from(document.querySelectorAll('button')).some(b => b.textContent.toLowerCase().includes('update'));
      return JSON.stringify({ hasCallbackField, hasUpdateBtn });
    })()`
  });
  console.log('Settings check:', isSettingsPage?.result?.value || 'N/A');

  // Try to find the callback URL field
  const cbResult = await sendCmd(ws, 'Runtime.evaluate', {
    expression: `
      (function() {
        const els = document.querySelectorAll('input[type="text"], input[type="url"], textarea');
        const results = [];
        els.forEach((el, i) => {
          results.push({ index: i, id: el.id, name: el.name, value: el.value, placeholder: el.placeholder });
        });
        return JSON.stringify(results);
      })()
    `
  });
  console.log('Input fields:', cbResult?.result?.value || 'N/A');

  // Update callback URL - ADD the new website callback
  // GitHub OAuth apps support multiple callback URLs separated by newlines
  const updateResult = await sendCmd(ws, 'Runtime.evaluate', {
    expression: `
      (function() {
        const inputs = document.querySelectorAll('input[type="text"], input[type="url"], textarea');
        for (const el of inputs) {
          if (el.value && el.value.includes('aiapisave.xyz')) {
            const oldVal = el.value;
            const newCallback = 'https://www.aiapisave.xyz/api/auth/callback/github';
            if (!oldVal.includes(newCallback)) {
              // Set value and trigger React events
              const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
              nativeInputValueSetter.call(el, oldVal + '\\n' + newCallback);
              el.dispatchEvent(new Event('input', { bubbles: true }));
              el.dispatchEvent(new Event('change', { bubbles: true }));
              return JSON.stringify({ status: 'updated', old: oldVal, new: el.value });
            }
            return JSON.stringify({ status: 'already_exists', value: oldVal });
          }
        }
        return JSON.stringify({ status: 'not_found' });
      })()
    `
  });
  console.log('Update result:', updateResult?.result?.value || 'N/A');

  // Find and click Update/Save button
  const btnResult = await sendCmd(ws, 'Runtime.evaluate', {
    expression: `
      (function() {
        const buttons = document.querySelectorAll('button');
        const results = [];
        buttons.forEach((b, i) => {
          const text = b.textContent.trim().substring(0, 60);
          if (text.toLowerCase().includes('update') || text.toLowerCase().includes('save')) {
            results.push({ index: i, text, disabled: b.disabled });
          }
        });
        return JSON.stringify(results);
      })()
    `
  });
  console.log('Buttons:', btnResult?.result?.value || 'N/A');

  // Click the update button
  const clickResult = await sendCmd(ws, 'Runtime.evaluate', {
    expression: `
      (function() {
        const buttons = document.querySelectorAll('button');
        for (const b of buttons) {
          const text = b.textContent.trim().toLowerCase();
          if ((text.includes('update') || text.includes('save')) && !b.disabled) {
            b.click();
            return JSON.stringify({ clicked: true, text: b.textContent.trim() });
          }
        }
        return JSON.stringify({ clicked: false, reason: 'no enabled update/save button' });
      })()
    `
  });
  console.log('Click result:', clickResult?.result?.value || 'N/A');

  await new Promise(r => setTimeout(r, 2000));

  // Check for success message
  const status = await sendCmd(ws, 'Runtime.evaluate', {
    expression: 'document.body.innerText.substring(0, 1000)'
  });
  console.log('Final page text:', status?.result?.value || 'N/A');

  ws.close();
  process.exit(0);
}

main().catch(err => { console.error('ERROR:', err.message); process.exit(1); });
