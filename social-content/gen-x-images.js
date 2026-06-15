const fs = require('fs');
const path = require('path');
const out = 'C:\\Users\\Administrator\\token-hacker\\social-content\\output-images';

function html(title, body, w=1200, h=675) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:${w}px;height:${h}px;overflow:hidden;font-family:'Segoe UI',system-ui,sans-serif;background:#0A0A0A;color:#fff}
.g{position:absolute;border-radius:50%}
.g1{top:-120px;left:-120px;width:400px;height:400px;background:radial-gradient(circle,rgba(0,255,65,0.12),transparent)}
.g2{bottom:-100px;right:-100px;width:350px;height:350px;background:radial-gradient(circle,rgba(0,255,65,0.08),transparent)}
.accent{color:#00FF41}.dim{color:#A0A0A0}.red{color:#FF4444}
</style></head><body><div class="g g1"></div><div class="g g2"></div>${body}</body></html>`;
}

// === X (Twitter) 1200x675 ===

// 1. Price Shock Cover
fs.writeFileSync(path.join(out,'x-01-price-shock.html'), html('Price Shock', `
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:60px;position:relative;z-index:1">
<h1 style="font-size:54px;font-weight:800;text-align:center;line-height:1.15">You're Overpaying for<br>AI APIs by <span class="accent">60%</span></h1>
<p style="font-size:22px;color:#A0A0A0;margin-top:24px">Same models. Same quality. Half the price.</p>
<div style="display:flex;gap:50px;margin-top:50px;align-items:center">
  <div style="text-align:center"><div style="font-size:12px;letter-spacing:3px;color:#666;margin-bottom:10px">OFFICIAL</div><div style="font-size:46px;font-weight:800;color:#FF4444">$15.00</div><div style="font-size:15px;color:#A0A0A0">per 1M tokens</div></div>
  <div style="font-size:40px;color:#00FF41">→</div>
  <div style="text-align:center"><div style="font-size:12px;letter-spacing:3px;color:#00FF41;margin-bottom:10px">TOKEN HACKER</div><div style="font-size:46px;font-weight:800;color:#00FF41">$6.00</div><div style="font-size:15px;color:#A0A0A0">per 1M tokens</div></div>
</div>
<div style="margin-top:28px;background:rgba(0,255,65,0.08);border:1px solid rgba(0,255,65,0.25);border-radius:10px;padding:10px 30px"><span style="color:#00FF41;font-size:26px;font-weight:800">Save $9.00/M</span><span style="color:#A0A0A0;font-size:16px"> — Claude Sonnet 4 pricing</span></div>
</div>`));

// 2. Price Comparison Table
fs.writeFileSync(path.join(out,'x-02-price-compare.html'), html('Price Compare', `
<div style="display:flex;flex-direction:column;justify-content:center;height:100%;padding:50px 80px;position:relative;z-index:1">
<h2 style="font-size:32px;font-weight:700;margin-bottom:8px"><span class="accent">▸</span> Token Hacker vs Official Pricing</h2>
<p style="font-size:15px;color:#666;margin-bottom:30px">Price per 1M input tokens (USD)</p>
<table style="width:100%;border-collapse:collapse;font-size:16px">
<tr style="border-bottom:1px solid #222"><th style="text-align:left;padding:12px 8px;color:#666;font-weight:600;font-size:13px">MODEL</th><th style="text-align:right;padding:12px 8px;color:#FF4444;font-weight:600;font-size:13px">OFFICIAL</th><th style="text-align:right;padding:12px 8px;color:#00FF41;font-weight:600;font-size:13px">TOKEN HACKER</th><th style="text-align:right;padding:12px 8px;color:#666;font-weight:600;font-size:13px">SAVE</th></tr>
<tr style="border-bottom:1px solid #1A1A1A"><td style="padding:14px 8px;font-weight:600">GPT-4o</td><td style="text-align:right;padding:14px 8px;color:#FF4444">$2.50</td><td style="text-align:right;padding:14px 8px;color:#00FF41">$1.09</td><td style="text-align:right;padding:14px 8px"><span style="background:rgba(0,255,65,0.12);color:#00FF41;padding:4px 10px;border-radius:6px;font-weight:700">56%</span></td></tr>
<tr style="border-bottom:1px solid #1A1A1A"><td style="padding:14px 8px;font-weight:600">Claude Sonnet 4</td><td style="text-align:right;padding:14px 8px;color:#FF4444">$3.00</td><td style="text-align:right;padding:14px 8px;color:#00FF41">$1.20</td><td style="text-align:right;padding:14px 8px"><span style="background:rgba(0,255,65,0.12);color:#00FF41;padding:4px 10px;border-radius:6px;font-weight:700">60%</span></td></tr>
<tr style="border-bottom:1px solid #1A1A1A"><td style="padding:14px 8px;font-weight:600">Claude Opus 4</td><td style="text-align:right;padding:14px 8px;color:#FF4444">$15.00</td><td style="text-align:right;padding:14px 8px;color:#00FF41">$5.00</td><td style="text-align:right;padding:14px 8px"><span style="background:rgba(0,255,65,0.12);color:#00FF41;padding:4px 10px;border-radius:6px;font-weight:700">67%</span></td></tr>
<tr style="border-bottom:1px solid #1A1A1A"><td style="padding:14px 8px;font-weight:600">DeepSeek V4</td><td style="text-align:right;padding:14px 8px;color:#FF4444">$2.00</td><td style="text-align:right;padding:14px 8px;color:#00FF41">$1.33</td><td style="text-align:right;padding:14px 8px"><span style="background:rgba(0,255,65,0.12);color:#00FF41;padding:4px 10px;border-radius:6px;font-weight:700">34%</span></td></tr>
<tr style="border-bottom:1px solid #1A1A1A"><td style="padding:14px 8px;font-weight:600">Gemini 2.5 Pro</td><td style="text-align:right;padding:14px 8px;color:#FF4444">$1.25</td><td style="text-align:right;padding:14px 8px;color:#00FF41">$0.54</td><td style="text-align:right;padding:14px 8px"><span style="background:rgba(0,255,65,0.12);color:#00FF41;padding:4px 10px;border-radius:6px;font-weight:700">57%</span></td></tr>
</table>
</div>`));

// 3. One Key Card
fs.writeFileSync(path.join(out,'x-03-one-key.html'), html('One Key', `
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:50px;position:relative;z-index:1">
<div style="font-size:64px;margin-bottom:20px">🔑</div>
<h2 style="font-size:44px;font-weight:800;text-align:center">One API Key.<br><span class="accent">200+ AI Models.</span></h2>
<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:40px;max-width:900px">
  <span style="background:#1A1A1A;border:1px solid #333;padding:8px 18px;border-radius:8px;font-size:14px;font-weight:600">✅ GPT-4o</span>
  <span style="background:#1A1A1A;border:1px solid #333;padding:8px 18px;border-radius:8px;font-size:14px;font-weight:600">✅ Claude 4</span>
  <span style="background:#1A1A1A;border:1px solid #333;padding:8px 18px;border-radius:8px;font-size:14px;font-weight:600">✅ Gemini 2.5</span>
  <span style="background:#1A1A1A;border:1px solid #333;padding:8px 18px;border-radius:8px;font-size:14px;font-weight:600">✅ DeepSeek V4</span>
  <span style="background:#1A1A1A;border:1px solid #333;padding:8px 18px;border-radius:8px;font-size:14px;font-weight:600">✅ Llama 4</span>
  <span style="background:#1A1A1A;border:1px solid #333;padding:8px 18px;border-radius:8px;font-size:14px;font-weight:600">✅ Qwen 3</span>
  <span style="background:#1A1A1A;border:1px solid #333;padding:8px 18px;border-radius:8px;font-size:14px;font-weight:600">✅ Grok</span>
  <span style="background:#1A1A1A;border:1px solid #333;padding:8px 18px;border-radius:8px;font-size:14px;font-weight:600">✅ Mistral</span>
  <span style="background:#1A1A1A;border:1px solid #333;padding:8px 18px;border-radius:8px;font-size:14px;font-weight:600">+190 more</span>
</div>
<p style="font-size:18px;color:#A0A0A0;margin-top:36px">One integration. One billing. Zero new SDKs.</p>
</div>`));

// 4. Code Change Card
fs.writeFileSync(path.join(out,'x-04-code-change.html'), html('Code Change', `
<div style="display:flex;flex-direction:column;justify-content:center;height:100%;padding:50px 80px;position:relative;z-index:1">
<h2 style="font-size:32px;font-weight:800;margin-bottom:30px"><span class="accent">Change 2 lines.</span> Save 60%.</h2>
<div style="background:#141414;border:1px solid #2A2A2A;border-radius:10px;padding:30px;font-family:'Cascadia Code','Consolas',monospace;font-size:16px;line-height:2">
<div style="color:#FF4444">- base_url = <span style="color:#FF8888">"https://api.openai.com/v1"</span></div>
<div style="color:#00FF41">+ base_url = <span style="color:#66FF99">"https://api.aiapisave.xyz/v1"</span></div>
<div style="margin-top:16px;color:#FF4444">- model = <span style="color:#FF8888">"gpt-4o"</span></div>
<div style="color:#00FF41">+ model = <span style="color:#66FF99">"openai/gpt-4o"</span></div>
</div>
<p style="font-size:17px;color:#A0A0A0;margin-top:24px">That's it. Your existing code works. OpenAI SDK compatible.</p>
</div>`));

// 5. Payment Card
fs.writeFileSync(path.join(out,'x-05-payment.html'), html('Payment', `
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:60px;position:relative;z-index:1">
<div style="display:flex;gap:30px;align-items:center;margin-bottom:30px">
  <div style="background:#1A1A1A;border:1px solid #333;border-radius:16px;padding:30px 40px;text-align:center"><div style="font-size:48px">💳</div><div style="font-size:20px;font-weight:700;margin-top:12px">Credit/Debit Card</div><div style="font-size:14px;color:#A0A0A0;margin-top:6px">Visa · Mastercard</div></div>
  <div style="font-size:28px;color:#666">+</div>
  <div style="background:#1A1A1A;border:1px solid #333;border-radius:16px;padding:30px 40px;text-align:center"><div style="font-size:48px">💎</div><div style="font-size:20px;font-weight:700;margin-top:12px">USDT-TRC20</div><div style="font-size:14px;color:#A0A0A0;margin-top:6px">Crypto payment</div></div>
</div>
<h2 style="font-size:36px;font-weight:800;text-align:center">Prepaid. <span class="accent">No subscription.</span></h2>
<p style="font-size:19px;color:#A0A0A0;margin-top:16px">Top up when you need. Balance never expires.</p>
</div>`));

// 6. Privacy Card
fs.writeFileSync(path.join(out,'x-06-privacy.html'), html('Privacy', `
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:60px;position:relative;z-index:1">
<div style="font-size:72px;margin-bottom:24px">🔒</div>
<h2 style="font-size:40px;font-weight:800;text-align:center">We don't log<br>your prompts.</h2>
<div style="display:flex;flex-direction:column;gap:16px;margin-top:40px">
  <div style="display:flex;align-items:center;gap:14px"><span style="color:#00FF41;font-size:22px">✕</span><span style="font-size:20px;color:#A0A0A0">Log your prompts</span></div>
  <div style="display:flex;align-items:center;gap:14px"><span style="color:#00FF41;font-size:22px">✕</span><span style="font-size:20px;color:#A0A0A0">Store your outputs</span></div>
  <div style="display:flex;align-items:center;gap:14px"><span style="color:#00FF41;font-size:22px">✕</span><span style="font-size:20px;color:#A0A0A0">Train on your data</span></div>
  <div style="display:flex;align-items:center;gap:14px"><span style="color:#00FF41;font-size:22px">✕</span><span style="font-size:20px;color:#A0A0A0">Sell usage patterns</span></div>
</div>
<p style="font-size:22px;font-weight:700;margin-top:36px">Your data is <span class="accent">your data</span>.</p>
</div>`));

// 7. Global Card
fs.writeFileSync(path.join(out,'x-07-global.html'), html('Global', `
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:60px;position:relative;z-index:1">
<div style="font-size:72px;margin-bottom:20px">🌍</div>
<h2 style="font-size:44px;font-weight:800;text-align:center">AI APIs,<br><span class="accent">Unblocked.</span></h2>
<p style="font-size:20px;color:#A0A0A0;margin-top:20px;text-align:center;max-width:700px">Hong Kong routing. No VPN needed. No geo-restrictions.</p>
<div style="display:flex;gap:40px;margin-top:40px">
  <div style="text-align:center"><div style="font-size:16px;color:#A0A0A0;margin-bottom:8px">Chinese Devs</div><div style="font-size:28px;font-weight:700">Use GPT-4o, Claude</div><div style="font-size:15px;color:#666">Without VPN</div></div>
  <div style="width:1px;background:#333"></div>
  <div style="text-align:center"><div style="font-size:16px;color:#A0A0A0;margin-bottom:8px">Global Devs</div><div style="font-size:28px;font-weight:700">Use DeepSeek, Qwen</div><div style="font-size:15px;color:#666">Without CN ID</div></div>
</div>
</div>`));

console.log('All 7 X/Twitter images generated!');
