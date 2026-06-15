const fs = require('fs');
const path = require('path');
const out = 'C:\\Users\\Administrator\\token-hacker\\social-content\\output-images';
const W=1080, H=1080; // IG square

function igHTML(body) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:${W}px;height:${H}px;overflow:hidden;font-family:'Segoe UI',system-ui,sans-serif;background:#0A0A0A;color:#fff}
.g{position:absolute;border-radius:50%}
.g1{top:-150px;left:-150px;width:500px;height:500px;background:radial-gradient(circle,rgba(0,255,65,0.1),transparent)}
.g2{bottom:-120px;right:-120px;width:450px;height:450px;background:radial-gradient(circle,rgba(0,255,65,0.06),transparent)}
.a{color:#00FF41}.d{color:#A0A0A0}.r{color:#FF4444}
</style></head><body><div class="g g1"></div><div class="g g2"></div>${body}</body></html>`;
}

// === CAROUSEL 1: Price Destroyer (6 slides) ===

// Slide 1 - Cover
fs.writeFileSync(path.join(out,'ig-c1-01-cover.html'), igHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:80px;position:relative;z-index:1;text-align:center">
<div style="font-size:28px;color:#FF4444;text-transform:uppercase;letter-spacing:6px;margin-bottom:20px">Stop Overpaying</div>
<h1 style="font-size:72px;font-weight:900;line-height:1.1">You're paying<br><span class="a">60% too much</span><br>for AI APIs</h1>
<p style="font-size:24px;color:#A0A0A0;margin-top:30px">Here's the proof ↓</p>
</div>`));

// Slide 2 - GPT-4o
fs.writeFileSync(path.join(out,'ig-c1-02-gpt4o.html'), igHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;height:100%;padding:80px;position:relative;z-index:1">
<div style="font-size:22px;color:#666;text-transform:uppercase;letter-spacing:4px;margin-bottom:16px">GPT-4o</div>
<div style="display:flex;align-items:center;gap:30px;margin-bottom:10px">
  <div style="flex:1"><div style="font-size:15px;color:#FF4444;margin-bottom:6px">OPENAI OFFICIAL</div><div style="font-size:56px;font-weight:900;color:#FF4444">$2.50</div><div style="font-size:18px;color:#666">input / 1M tokens</div></div>
  <div style="font-size:40px;color:#666">vs</div>
  <div style="flex:1"><div style="font-size:15px;color:#00FF41;margin-bottom:6px">TOKEN HACKER</div><div style="font-size:56px;font-weight:900;color:#00FF41">$1.09</div><div style="font-size:18px;color:#666">input / 1M tokens</div></div>
</div>
<div style="margin-top:30px;background:rgba(0,255,65,0.08);padding:16px 24px;border-radius:12px;display:inline-block">
  <span style="font-size:32px;font-weight:900;color:#00FF41">56%</span><span style="font-size:20px;color:#A0A0A0"> cheaper</span>
</div>
<p style="font-size:20px;color:#A0A0A0;margin-top:16px">Output: $10.00 → <span class="a">$4.38</span></p>
</div>`));

// Slide 3 - Claude
fs.writeFileSync(path.join(out,'ig-c1-03-claude.html'), igHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;height:100%;padding:80px;position:relative;z-index:1">
<div style="font-size:22px;color:#666;text-transform:uppercase;letter-spacing:4px;margin-bottom:16px">Claude Sonnet 4</div>
<div style="display:flex;align-items:center;gap:30px;margin-bottom:10px">
  <div style="flex:1"><div style="font-size:15px;color:#FF4444;margin-bottom:6px">ANTHROPIC OFFICIAL</div><div style="font-size:56px;font-weight:900;color:#FF4444">$3.00</div><div style="font-size:18px;color:#666">input / 1M tokens</div></div>
  <div style="font-size:40px;color:#666">vs</div>
  <div style="flex:1"><div style="font-size:15px;color:#00FF41;margin-bottom:6px">TOKEN HACKER</div><div style="font-size:56px;font-weight:900;color:#00FF41">$1.20</div><div style="font-size:18px;color:#666">input / 1M tokens</div></div>
</div>
<div style="margin-top:30px;background:rgba(0,255,65,0.08);padding:16px 24px;border-radius:12px;display:inline-block">
  <span style="font-size:32px;font-weight:900;color:#00FF41">60%</span><span style="font-size:20px;color:#A0A0A0"> cheaper</span>
</div>
<p style="font-size:20px;color:#A0A0A0;margin-top:16px">Output: $15.00 → <span class="a">$6.00</span></p>
</div>`));

// Slide 4 - DeepSeek
fs.writeFileSync(path.join(out,'ig-c1-04-deepseek.html'), igHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;height:100%;padding:80px;position:relative;z-index:1">
<div style="font-size:22px;color:#666;text-transform:uppercase;letter-spacing:4px;margin-bottom:16px">DeepSeek V4</div>
<div style="display:flex;align-items:center;gap:30px;margin-bottom:10px">
  <div style="flex:1"><div style="font-size:15px;color:#FF4444;margin-bottom:6px">DEEPSEEK OFFICIAL</div><div style="font-size:56px;font-weight:900;color:#FF4444">$2.00</div><div style="font-size:18px;color:#666">input / 1M tokens</div></div>
  <div style="font-size:40px;color:#666">vs</div>
  <div style="flex:1"><div style="font-size:15px;color:#00FF41;margin-bottom:6px">TOKEN HACKER</div><div style="font-size:56px;font-weight:900;color:#00FF41">$1.33</div><div style="font-size:18px;color:#666">input / 1M tokens</div></div>
</div>
<div style="margin-top:30px;background:rgba(0,255,65,0.08);padding:16px 24px;border-radius:12px;display:inline-block">
  <span style="font-size:32px;font-weight:900;color:#00FF41">34%</span><span style="font-size:20px;color:#A0A0A0"> cheaper</span>
</div>
<div style="margin-top:20px;display:flex;align-items:center;gap:10px;background:rgba(0,255,65,0.06);padding:12px 20px;border-radius:8px"><span style="font-size:24px">🌍</span><span style="font-size:20px;color:#A0A0A0">No geo-restrictions. No China ID needed.</span></div>
</div>`));

// Slide 5 - Why?
fs.writeFileSync(path.join(out,'ig-c1-05-why.html'), igHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;height:100%;padding:80px;position:relative;z-index:1">
<h2 style="font-size:48px;font-weight:800;margin-bottom:40px">How is this<br><span class="a">possible?</span></h2>
<div style="display:flex;flex-direction:column;gap:28px">
  <div style="display:flex;align-items:center;gap:20px"><div style="font-size:40px">📦</div><div><div style="font-size:24px;font-weight:700">Bulk purchasing</div><div style="font-size:18px;color:#A0A0A0">We buy tokens in volume. You get the discount.</div></div></div>
  <div style="display:flex;align-items:center;gap:20px"><div style="font-size:40px">🔄</div><div><div style="font-size:24px;font-weight:700">Multi-provider routing</div><div style="font-size:18px;color:#A0A0A0">Smart failover across 4 upstream channels.</div></div></div>
  <div style="display:flex;align-items:center;gap:20px"><div style="font-size:40px">🔑</div><div><div style="font-size:24px;font-weight:700">Single integration</div><div style="font-size:18px;color:#A0A0A0">200+ models. One API key. One bill.</div></div></div>
  <div style="display:flex;align-items:center;gap:20px"><div style="font-size:40px">🚫</div><div><div style="font-size:24px;font-weight:700">No overhead</div><div style="font-size:18px;color:#A0A0A0">No sales team. No enterprise bloat. Just API.</div></div></div>
</div>
</div>`));

// Slide 6 - CTA
fs.writeFileSync(path.join(out,'ig-c1-06-cta.html'), igHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:80px;position:relative;z-index:1;text-align:center">
<h1 style="font-size:68px;font-weight:900;line-height:1.15">Your code<br><span style="color:#666">doesn't change.</span><br>Your bill <span class="a">does.</span></h1>
<div style="margin-top:50px">
  <div style="font-size:64px;font-weight:900;color:#00FF41">↓ 60%</div>
</div>
<div style="margin-top:50px;font-size:26px;color:#A0A0A0">tokenhacker.vercel.app</div>
</div>`));

// === CAROUSEL 2: One Key (7 slides) ===

// Slide 1 - Cover
fs.writeFileSync(path.join(out,'ig-c2-01-cover.html'), igHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:80px;position:relative;z-index:1;text-align:center">
<div style="font-size:80px;margin-bottom:20px">🔑</div>
<h1 style="font-size:58px;font-weight:900;line-height:1.15"><span class="a">One API Key</span><br>to Rule Them All</h1>
<p style="font-size:24px;color:#A0A0A0;margin-top:30px">200+ AI models. One integration.</p>
</div>`));

// Slide 2 - Pain point
fs.writeFileSync(path.join(out,'ig-c2-02-pain.html'), igHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;height:100%;padding:80px;position:relative;z-index:1">
<h2 style="font-size:44px;font-weight:800;margin-bottom:40px">Sound familiar?</h2>
<div style="display:flex;flex-direction:column;gap:20px">
  <div style="display:flex;align-items:center;gap:16px"><span style="font-size:28px">❌</span><span style="font-size:22px">5 different API keys</span></div>
  <div style="display:flex;align-items:center;gap:16px"><span style="font-size:28px">❌</span><span style="font-size:22px">5 billing dashboards</span></div>
  <div style="display:flex;align-items:center;gap:16px"><span style="font-size:28px">❌</span><span style="font-size:22px">5 different SDKs</span></div>
  <div style="display:flex;align-items:center;gap:16px"><span style="font-size:28px">❌</span><span style="font-size:22px">5 rate limits to track</span></div>
  <div style="display:flex;align-items:center;gap:16px"><span style="font-size:28px">❌</span><span style="font-size:22px">5 monthly bills</span></div>
</div>
<div style="margin-top:40px;font-size:24px;font-weight:700">There's a <span class="a">better way</span>.</div>
</div>`));

// Slide 3 - Solution
fs.writeFileSync(path.join(out,'ig-c2-03-solution.html'), igHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:80px;position:relative;z-index:1;text-align:center">
<div style="font-size:100px;margin-bottom:30px">🔑</div>
<h2 style="font-size:48px;font-weight:900">One Key.<br><span class="a">All Models.</span></h2>
<p style="font-size:22px;color:#A0A0A0;margin-top:24px;max-width:700px">Use the OpenAI SDK — call GPT-4o, Claude, Gemini, DeepSeek, and 200+ more. One base URL. One API key.</p>
</div>`));

// Slide 4 - Models grid
fs.writeFileSync(path.join(out,'ig-c2-04-models.html'), igHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;height:100%;padding:70px;position:relative;z-index:1">
<h2 style="font-size:38px;font-weight:800;margin-bottom:30px"><span class="a">200+</span> Models Available</h2>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;font-size:16px">
  <div style="background:#141414;border:1px solid #2A2A2A;padding:16px;border-radius:10px;text-align:center;font-weight:700">🧠 GPT-4o</div>
  <div style="background:#141414;border:1px solid #2A2A2A;padding:16px;border-radius:10px;text-align:center;font-weight:700">🔧 Claude 4</div>
  <div style="background:#141414;border:1px solid #2A2A2A;padding:16px;border-radius:10px;text-align:center;font-weight:700">⚡ Gemini 2.5</div>
  <div style="background:#141414;border:1px solid #2A2A2A;padding:16px;border-radius:10px;text-align:center;font-weight:700">💸 DeepSeek V4</div>
  <div style="background:#141414;border:1px solid #2A2A2A;padding:16px;border-radius:10px;text-align:center;font-weight:700">🦙 Llama 4</div>
  <div style="background:#141414;border:1px solid #2A2A2A;padding:16px;border-radius:10px;text-align:center;font-weight:700">☁️ Qwen 3</div>
  <div style="background:#141414;border:1px solid #2A2A2A;padding:16px;border-radius:10px;text-align:center;font-weight:700">🌪️ Mistral</div>
  <div style="background:#141414;border:1px solid #2A2A2A;padding:16px;border-radius:10px;text-align:center;font-weight:700">🤖 Grok</div>
  <div style="background:rgba(0,255,65,0.08);border:1px solid rgba(0,255,65,0.3);padding:16px;border-radius:10px;text-align:center;font-weight:700;color:#00FF41">+190 more</div>
</div>
</div>`));

// Slide 5 - Code
fs.writeFileSync(path.join(out,'ig-c2-05-code.html'), igHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;height:100%;padding:70px;position:relative;z-index:1">
<h2 style="font-size:38px;font-weight:800;margin-bottom:10px"><span class="a">Same code.</span> Any model.</h2>
<p style="font-size:18px;color:#A0A0A0;margin-bottom:30px">Switch models by changing one string</p>
<div style="background:#141414;border:1px solid #2A2A2A;border-radius:12px;padding:30px;font-family:'Cascadia Code',Consolas,monospace;font-size:18px;line-height:2.2">
<div><span style="color:#666">client = OpenAI(</span></div>
<div><span style="color:#666">  base_url=</span><span style="color:#66FF99">"https://api.aiapisave.xyz/v1"</span><span style="color:#666">,</span></div>
<div><span style="color:#666">  api_key=</span><span style="color:#66FF99">"sk-..."</span></div>
<div><span style="color:#666">)</span></div>
<div style="margin-top:16px"><span style="color:#666">model=</span><span style="color:#FFCC00;background:rgba(255,204,0,0.1);padding:2px 6px;border-radius:4px">"anthropic/claude-sonnet-4"</span></div>
</div>
<p style="font-size:16px;color:#A0A0A0;margin-top:20px">← Change this to switch models</p>
</div>`));

// Slide 6 - Payment
fs.writeFileSync(path.join(out,'ig-c2-06-payment.html'), igHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:80px;position:relative;z-index:1;text-align:center">
<h2 style="font-size:44px;font-weight:800;margin-bottom:40px">Pay <span class="a">your way</span></h2>
<div style="display:flex;gap:30px">
  <div style="background:#141414;border:1px solid #2A2A2A;border-radius:16px;padding:40px;text-align:center;width:300px"><div style="font-size:60px">💳</div><div style="font-size:24px;font-weight:700;margin-top:16px">Card</div><div style="font-size:16px;color:#A0A0A0;margin-top:8px">Visa · Mastercard</div></div>
  <div style="background:#141414;border:1px solid #2A2A2A;border-radius:16px;padding:40px;text-align:center;width:300px"><div style="font-size:60px">💎</div><div style="font-size:24px;font-weight:700;margin-top:16px">USDT</div><div style="font-size:16px;color:#A0A0A0;margin-top:8px">TRC20 · No KYC</div></div>
</div>
<div style="margin-top:40px"><span style="font-size:28px;font-weight:800">Prepaid.</span><span style="font-size:28px;color:#A0A0A0"> No subscription. Balance never expires.</span></div>
</div>`));

// Slide 7 - CTA
fs.writeFileSync(path.join(out,'ig-c2-07-cta.html'), igHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:80px;position:relative;z-index:1;text-align:center">
<h1 style="font-size:60px;font-weight:900;line-height:1.15">One Key.<br><span class="a">200+ Models.</span><br>60% Less.</h1>
<div style="margin-top:50px;font-size:30px;color:#A0A0A0">tokenhacker.vercel.app</div>
<div style="margin-top:30px;font-size:20px;color:#666">Free starter balance. No credit card required.</div>
</div>`));

console.log('All 13 IG carousel slides generated!');
