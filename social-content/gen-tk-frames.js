const fs = require('fs');
const path = require('path');
const out = 'C:\\Users\\Administrator\\token-hacker\\social-content\\output-images';
const W=1080, H=1920;

function tkHTML(body) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:${W}px;height:${H}px;overflow:hidden;font-family:'Segoe UI',system-ui,sans-serif;background:#0A0A0A;color:#fff}
.g{position:absolute;border-radius:50%}
.g1{top:-200px;left:-200px;width:600px;height:600px;background:radial-gradient(circle,rgba(0,255,65,0.08),transparent)}
.g2{bottom:-150px;right:-150px;width:500px;height:500px;background:radial-gradient(circle,rgba(0,255,65,0.05),transparent)}
.a{color:#00FF41}.d{color:#A0A0A0}.r{color:#FF4444}
</style></head><body><div class="g g1"></div><div class="g g2"></div>${body}</body></html>`;
}

// === VIDEO 1: "The API Key Problem" (25s) ===

// Frame 1: Hook
fs.writeFileSync(path.join(out,'tk-v1-01-hook.html'), tkHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:80px;position:relative;z-index:1;text-align:center">
<div style="font-size:40px;color:#FF4444;margin-bottom:30px">😤</div>
<h2 style="font-size:52px;font-weight:900;line-height:1.2">Managing 5<br>AI API Keys<br>is a nightmare</h2>
</div>`));

// Frame 2: Problem detail
fs.writeFileSync(path.join(out,'tk-v1-02-problem.html'), tkHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;height:100%;padding:80px;position:relative;z-index:1">
<div style="display:flex;flex-direction:column;gap:24px;font-size:28px">
  <div style="display:flex;align-items:center;gap:18px"><span style="font-size:36px">🔑</span> 5 API keys</div>
  <div style="display:flex;align-items:center;gap:18px"><span style="font-size:36px">💳</span> 5 billing cycles</div>
  <div style="display:flex;align-items:center;gap:18px"><span style="font-size:36px">📚</span> 5 different SDKs</div>
  <div style="display:flex;align-items:center;gap:18px"><span style="font-size:36px">⏱️</span> 5 rate limits</div>
  <div style="display:flex;align-items:center;gap:18px"><span style="font-size:36px">📊</span> 5 dashboards</div>
</div>
<div style="margin-top:40px;font-size:24px;color:#A0A0A0">Every single month.</div>
</div>`));

// Frame 3: Solution
fs.writeFileSync(path.join(out,'tk-v1-03-solution.html'), tkHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:80px;position:relative;z-index:1;text-align:center">
<div style="font-size:100px;margin-bottom:30px">🔑</div>
<h2 style="font-size:56px;font-weight:900;line-height:1.2"><span class="a">One Key.</span><br>200+ Models.</h2>
<p style="font-size:28px;color:#A0A0A0;margin-top:30px">That's Token Hacker.</p>
</div>`));

// Frame 4: Price
fs.writeFileSync(path.join(out,'tk-v1-04-price.html'), tkHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:80px;position:relative;z-index:1;text-align:center">
<div style="font-size:28px;color:#FF4444;margin-bottom:10px">Official: $15.00/M</div>
<div style="display:flex;align-items:center;gap:20px;margin:20px 0">
  <div style="width:300px;height:4px;background:#FF4444;border-radius:2px"></div>
  <div style="font-size:40px;color:#666">→</div>
  <div style="width:120px;height:4px;background:#00FF41;border-radius:2px"></div>
</div>
<div style="font-size:52px;font-weight:900;color:#00FF41">$6.00/M</div>
<div style="margin-top:24px;background:rgba(0,255,65,0.1);padding:12px 30px;border-radius:12px">
  <span style="font-size:36px;font-weight:900;color:#00FF41">60%</span><span style="font-size:24px;color:#A0A0A0"> cheaper</span>
</div>
<p style="font-size:20px;color:#666;margin-top:24px">Claude Sonnet 4 • No subscription</p>
</div>`));

// Frame 5: CTA
fs.writeFileSync(path.join(out,'tk-v1-05-cta.html'), tkHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:80px;position:relative;z-index:1;text-align:center">
<h2 style="font-size:56px;font-weight:900;line-height:1.2">Try it free</h2>
<p style="font-size:28px;color:#A0A0A0;margin-top:20px">Free starter balance</p>
<div style="margin-top:50px;font-size:32px;color:#00FF41;font-weight:700">tokenhacker.vercel.app</div>
</div>`));

// === VIDEO 2: "Save 60%" (20s) ===

fs.writeFileSync(path.join(out,'tk-v2-01-hook.html'), tkHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:80px;position:relative;z-index:1;text-align:center">
<div style="font-size:80px;margin-bottom:30px">💰</div>
<h2 style="font-size:60px;font-weight:900">I cut my<br>AI bill by <span class="a">60%</span></h2>
<p style="font-size:28px;color:#A0A0A0;margin-top:24px">Here's how 👇</p>
</div>`));

fs.writeFileSync(path.join(out,'tk-v2-02-gpt4o.html'), tkHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;height:100%;padding:80px;position:relative;z-index:1;text-align:center">
<div style="font-size:32px;font-weight:700;margin-bottom:30px">GPT-4o</div>
<div style="display:flex;align-items:center;justify-content:center;gap:40px">
  <div><div style="font-size:22px;color:#FF4444;margin-bottom:10px">OpenAI</div><div style="font-size:64px;font-weight:900;color:#FF4444">$2.50</div></div>
  <div style="font-size:50px;color:#666">→</div>
  <div><div style="font-size:22px;color:#00FF41;margin-bottom:10px">Token Hacker</div><div style="font-size:64px;font-weight:900;color:#00FF41">$1.09</div></div>
</div>
<div style="margin-top:40px;font-size:44px;font-weight:900;color:#00FF41">56% off</div>
</div>`));

fs.writeFileSync(path.join(out,'tk-v2-03-claude.html'), tkHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;height:100%;padding:80px;position:relative;z-index:1;text-align:center">
<div style="font-size:32px;font-weight:700;margin-bottom:30px">Claude Sonnet 4</div>
<div style="display:flex;align-items:center;justify-content:center;gap:40px">
  <div><div style="font-size:22px;color:#FF4444;margin-bottom:10px">Anthropic</div><div style="font-size:64px;font-weight:900;color:#FF4444">$3.00</div></div>
  <div style="font-size:50px;color:#666">→</div>
  <div><div style="font-size:22px;color:#00FF41;margin-bottom:10px">Token Hacker</div><div style="font-size:64px;font-weight:900;color:#00FF41">$1.20</div></div>
</div>
<div style="margin-top:40px;font-size:44px;font-weight:900;color:#00FF41">60% off</div>
</div>`));

fs.writeFileSync(path.join(out,'tk-v2-04-total.html'), tkHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:80px;position:relative;z-index:1;text-align:center">
<div style="font-size:28px;color:#A0A0A0;margin-bottom:20px">Monthly usage: 50M tokens</div>
<div style="font-size:48px;font-weight:900;color:#FF4444;text-decoration:line-through;margin-bottom:10px">$125/month</div>
<div style="font-size:72px;font-weight:900;color:#00FF41">$55/month</div>
<div style="margin-top:30px;font-size:40px;font-weight:800">Save <span class="a">$840</span>/year</div>
</div>`));

fs.writeFileSync(path.join(out,'tk-v2-05-cta.html'), tkHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:80px;position:relative;z-index:1;text-align:center">
<h2 style="font-size:48px;font-weight:900;line-height:1.3">Same models.<br>Same quality.<br><span class="a">Half the price.</span></h2>
<div style="margin-top:50px;font-size:32px;color:#00FF41;font-weight:700">tokenhacker.vercel.app</div>
</div>`));

// === VIDEO 3: "One Line Switch" (15s) ===

fs.writeFileSync(path.join(out,'tk-v3-01-hook.html'), tkHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:80px;position:relative;z-index:1;text-align:center">
<div style="font-size:80px;margin-bottom:30px">🔄</div>
<h2 style="font-size:56px;font-weight:900;line-height:1.2">Switch models<br>in <span class="a">1 line</span></h2>
</div>`));

fs.writeFileSync(path.join(out,'tk-v3-02-gpt4o.html'), tkHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:80px;position:relative;z-index:1;text-align:center">
<div style="background:#141414;border:1px solid #2A2A2A;border-radius:16px;padding:40px 50px;font-family:'Cascadia Code',Consolas,monospace;font-size:30px">
<div style="color:#666">model = </div>
<div style="color:#66FF99;margin-top:16px">"openai/gpt-4o"</div>
</div>
<div style="margin-top:30px;font-size:24px;color:#A0A0A0">General purpose • Reliable</div>
</div>`));

fs.writeFileSync(path.join(out,'tk-v3-03-claude.html'), tkHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:80px;position:relative;z-index:1;text-align:center">
<div style="background:#141414;border:1px solid #2A2A2A;border-radius:16px;padding:40px 50px;font-family:'Cascadia Code',Consolas,monospace;font-size:30px">
<div style="color:#666">model = </div>
<div style="color:#FFCC00;margin-top:16px">"anthropic/claude-sonnet-4"</div>
</div>
<div style="margin-top:30px;font-size:24px;color:#A0A0A0">🔧 Best for coding</div>
</div>`));

fs.writeFileSync(path.join(out,'tk-v3-04-deepseek.html'), tkHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:80px;position:relative;z-index:1;text-align:center">
<div style="background:#141414;border:1px solid #2A2A2A;border-radius:16px;padding:40px 50px;font-family:'Cascadia Code',Consolas,monospace;font-size:30px">
<div style="color:#666">model = </div>
<div style="color:#00CCFF;margin-top:16px">"deepseek/deepseek-v4"</div>
</div>
<div style="margin-top:30px;font-size:24px;color:#A0A0A0">💸 Best value</div>
</div>`));

fs.writeFileSync(path.join(out,'tk-v3-05-cta.html'), tkHTML(`
<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:80px;position:relative;z-index:1;text-align:center">
<h2 style="font-size:52px;font-weight:900;line-height:1.3">One key.<br><span class="a">Infinite</span><br>possibilities.</h2>
<div style="margin-top:50px;font-size:32px;color:#00FF41;font-weight:700">tokenhacker.vercel.app</div>
</div>`));

console.log('All 15 TikTok frames generated!');
