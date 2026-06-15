const fs = require('fs');

const filePath = 'C:\\Users\\Administrator\\token-hacker\\lib\\translations.ts';

// Get clean original from git
const { execSync } = require('child_process');
let src = execSync('git -C C:\\Users\\Administrator\\token-hacker show HEAD:lib/translations.ts', { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });

console.log('Original length:', src.length);

// Helper: escape HTML string for single-quoted TS value
// Output: backslash-n for newlines, backslash' for single quotes
function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '');
}

// ===== CONTENT DEFINITIONS =====
// Each defined as a multiline template literal for readability.
// The esc() function converts actual newlines to \n for valid TS single-quoted strings.

// --- EN: why-aggregator ---
const en_why = esc(`<h2>The API Key Chaos</h2>
<p>If you're building AI-powered applications in 2026, you know the drill. You started with OpenAI — one API key, simple. Then Claude Opus crushed reasoning benchmarks, so you added Anthropic. Then DeepSeek launched with shockingly low pricing, so you opened an account there too. Then Google dropped Gemini 2.5 Pro with a 2-million-token context window... Before you realize it, you're juggling 5 to 10 different API keys across as many dashboards, each with its own billing cycle, rate limits, and SDK quirks.</p>
<p>Managing multiple AI providers isn't just annoying — it's expensive mental overhead. You're checking multiple dashboards for usage, reconciling multiple bills at month-end, learning slightly different API patterns, and rewriting integration code every time you want to test a different model. That's friction that shouldn't exist in 2026.</p>
<h2>What Is an AI API Aggregator?</h2>
<p>An AI API aggregator is a middleware layer that sits between your application and multiple AI model providers. Instead of calling OpenAI's API directly, you call the aggregator's unified API — and the aggregator transparently routes your request to whichever model you specify. You get <strong>one API key</strong>, <strong>one endpoint</strong>, <strong>one billing account</strong>, and immediate access to 200+ models across all major providers.</p>
<p>Think of it like a payment processor. When you swipe a Visa card at a store, you don't need a separate relationship with every bank. The processor handles all the routing. AI API aggregators do the same for language models.</p>
<blockquote>Token Hacker acts as your universal translation layer between your application and every major AI model on the market.</blockquote>
<h2>Key Benefits</h2>
<h3>Single API Key</h3>
<p>One API key unlocks GPT-5.4, Claude Opus 4, Claude Sonnet 4, Gemini 2.5 Pro, DeepSeek V4, Qwen, Llama, Mistral, and 200+ other models. No more storing a dozen secrets in your environment variables. No more conditional logic to route requests to different providers. Just one key, one endpoint.</p>
<h3>Cost Optimization</h3>
<p>Aggregators negotiate bulk rates with providers and pass the savings to you. Token Hacker prices are typically <strong>20-50% below</strong> direct API pricing for equivalent models. Instead of paying $15/M tokens for GPT-4o directly, you might pay $8/M through an aggregator. For a production app burning 50M tokens a month, that's real money.</p>
<h3>No Vendor Lock-In</h3>
<p>When you build directly on OpenAI's API, switching to Claude means changing SDKs, rewriting request formatting, and potentially refactoring response parsing. With an aggregator, switching models is a one-line change. If Anthropic has an outage, you seamlessly fail over to GPT. If DeepSeek raises prices, try Gemini. Your infrastructure stays decoupled from any single provider.</p>
<h3>Instant Model Access</h3>
<p>New model drops on a Tuesday afternoon? It's available on Token Hacker within hours — sometimes minutes. No new signup flow, no KYC, no billing setup. Just update the model name string in your code and you're using it. In the fast-moving AI landscape of 2026, that agility is a competitive advantage.</p>
<h2>Aggregator vs Direct — A Comparison</h2>
<table><thead><tr><th>Factor</th><th>API Aggregator (Token Hacker)</th><th>Direct Provider</th></tr></thead><tbody><tr><td><strong>API Keys to Manage</strong></td><td>1 key for all 200+ models</td><td>1 key per provider (5-10 keys)</td></tr><tr><td><strong>Billing</strong></td><td>Single prepaid balance, card or USDT</td><td>Multiple monthly invoices, separate payment methods</td></tr><tr><td><strong>Model Switching</strong></td><td>Change 1 string in code</td><td>New SDK, new auth, new response parsing</td></tr><tr><td><strong>Pricing</strong></td><td>20-50% below retail via bulk negotiation</td><td>Retail / pay-as-you-go pricing</td></tr><tr><td><strong>New Model Access</strong></td><td>Hours after launch</td><td>New signup, KYC, billing setup per provider</td></tr><tr><td><strong>Failover</strong></td><td>Automatic: swap model name if provider is down</td><td>Manual: need pre-existing account on backup provider</td></tr><tr><td><strong>Support</strong></td><td>Single point of contact</td><td>Per-provider support channels</td></tr></tbody></table>
<h2>Why Token Hacker?</h2>
<h3>Prepaid, No Subscription</h3>
<p>Most aggregators lock you into monthly subscriptions with minimum commitments. Token Hacker is different: <strong>prepaid only</strong>. Top up any amount via Stripe (credit card) or USDT-TRC20 (crypto). Your balance never expires. No monthly minimum. No auto-renewal you forget to cancel. Just pay for what you use, when you use it. This is especially valuable for indie developers, startups, and anyone who hates subscription fatigue.</p>
<h3>OpenAI Compatible — True Drop-In</h3>
<p>Token Hacker's API is fully OpenAI-compatible. That means any library, SDK, or tool built for OpenAI works out of the box. Python's <code>openai</code> package, LangChain, LlamaIndex, Vercel AI SDK, continue.dev — they all work with Token Hacker by changing exactly two configuration values: the base URL and the API key. No new library to learn, no code to rewrite.</p>
<h3>200+ Models Across All Providers</h3>
<p>From frontier models like GPT-5.4 and Claude Opus 4 to budget workhorses like DeepSeek V4 and Gemini 2.5 Flash, Token Hacker covers the full spectrum. Chat, reasoning, vision, embedding, image generation, TTS — all model types, all in one place. Visit <a href="https://aiapisave.xyz">aiapisave.xyz</a> to browse the full catalog.</p>
<h2>Real-World Example</h2>
<p>Here's a Python example showing how switching models is literally a one-string change:</p>
<pre><code>from openai import OpenAI

client = OpenAI(
    api_key="th-sk-your-key-here",
    base_url="https://api.aiapisave.xyz/v1"
)

# Use GPT-5.4 for complex reasoning
response = client.chat.completions.create(
    model="gpt-5.4",
    messages=[{"role": "user", "content": "Explain quantum entanglement"}]
)

# Switch to Claude Opus 4 — just change one string!
response = client.chat.completions.create(
    model="claude-opus-4",  # That's it. Everything else stays the same.
    messages=[{"role": "user", "content": "Explain quantum entanglement"}]
)

# Need a budget option? Try DeepSeek V4
response = client.chat.completions.create(
    model="deepseek-v4",  # Same code, 1/10th the cost
    messages=[{"role": "user", "content": "Explain quantum entanglement"}]
)</code></pre>
<p>No new SDK imports. No different request formats. No separate error handling. The aggregator handles all the provider-specific translation behind the scenes.</p>
<h2>The Bottom Line</h2>
<p>AI API aggregators aren't just a convenience — they're a strategic architectural decision. They decouple your application from any single model provider, give you instant access to every new model, and save you real money through bulk pricing. Token Hacker combines this with prepaid flexibility (no subscription), crypto payment support, and true OpenAI compatibility. If you're building with AI in 2026, using an aggregator isn't a question of <em>if</em> — it's <em>which one</em>. <a href="https://aiapisave.xyz">Start with Token Hacker today</a>.</p>`);

// --- EN: model-choosing-guide ---
const en_model = esc(`<h2>The Model Maze</h2>
<p>In 2026, the AI model landscape is overwhelming. There are dozens of models from at least six major providers, each claiming to be the best at something. GPT-5.4 excels at general intelligence. Claude Opus 4 dominates reasoning benchmarks. Claude Sonnet 4 is the coding champion. DeepSeek V4 offers near-frontier performance at a fraction of the cost. Gemini 2.5 Pro has a 2-million-token context window. And new models drop every week.</p>
<p>Choice is great — until you're staring at a model picker with 200+ options, unsure which one will actually work best for your specific use case. The wrong choice means wasted tokens, slower responses, or outputs that miss the mark. This guide gives you a practical framework for choosing the right model every time.</p>
<h2>Model Categories at a Glance</h2>
<table><thead><tr><th>Category</th><th>Best For</th><th>Top Pick</th><th>Budget Pick</th></tr></thead><tbody><tr><td><strong>General Chat</strong></td><td>Customer support, Q&A, everyday tasks</td><td>GPT-5.4</td><td>Gemini 2.5 Flash</td></tr><tr><td><strong>Coding</strong></td><td>Code generation, debugging, refactoring</td><td>Claude Sonnet 4</td><td>DeepSeek V4</td></tr><tr><td><strong>Deep Reasoning</strong></td><td>Math, logic, research, multi-step problems</td><td>Claude Opus 4</td><td>GPT-4o</td></tr><tr><td><strong>Creative Writing</strong></td><td>Content creation, storytelling, marketing</td><td>Claude Opus 4</td><td>GPT-4o</td></tr><tr><td><strong>Vision / Multimodal</strong></td><td>Image analysis, OCR, chart reading</td><td>GPT-5.4</td><td>Gemini 2.5 Pro</td></tr><tr><td><strong>Budget / Fast</strong></td><td>High-volume, latency-sensitive, simple tasks</td><td>DeepSeek V4</td><td>Gemini 2.5 Flash</td></tr></tbody></table>
<h2>Use Case Deep Dives</h2>
<h3>Coding & Development</h3>
<p>For code generation and debugging, <strong>Claude Sonnet 4</strong> is the current leader. It produces clean, idiomatic code with fewer hallucinations than competitors. It understands large codebases well and maintains context across long conversations. For budget-conscious projects, <strong>DeepSeek V4</strong> delivers surprisingly good code quality at roughly 1/10th the cost. <strong>GPT-4o</strong> remains a solid all-rounder if you're already in the OpenAI ecosystem.</p>
<p>Pro move: Use DeepSeek V4 for boilerplate generation and Claude Sonnet 4 for complex architectural decisions. Mix and match based on task complexity.</p>
<h3>Deep Reasoning & Analysis</h3>
<p>When you need a model to think through complex logic chains, mathematical proofs, or multi-step analysis, <strong>Claude Opus 4</strong> is the gold standard. Its extended thinking mode produces detailed chain-of-thought reasoning that's genuinely insightful. <strong>GPT-5.4</strong> is a close contender, especially for problems requiring broad world knowledge alongside reasoning.</p>
<p>Token Hacker supports both models through the same endpoint, so you can A/B test which one performs better for your specific reasoning tasks without changing any infrastructure.</p>
<h3>Creative Writing & Content</h3>
<p><strong>Claude Opus 4</strong> produces the most natural, human-like prose for creative writing, storytelling, and nuanced content. Its outputs feel less formulaic and more voice-driven than other models. <strong>GPT-4o</strong> is excellent for structured content like documentation, technical writing, and marketing copy that needs to follow specific guidelines.</p>
<h3>Budget-Conscious Projects</h3>
<p><strong>Gemini 2.5 Pro</strong> and <strong>DeepSeek V4</strong> offer incredible value. For tasks like summarization, classification, data extraction, and simple Q&A, these models perform nearly as well as frontier models at a small fraction of the cost. A typical application can save 60-80% on API costs by routing simpler tasks to these models while reserving Opus or GPT-5.4 for complex reasoning.</p>
<h2>Decision Framework</h2>
<p>Ask yourself these four questions before picking a model:</p>
<ol><li><strong>What's the task complexity?</strong> Simple tasks (classification, extraction) → budget models. Complex tasks (reasoning, creative work) → frontier models.</li><li><strong>What's your latency budget?</strong> Real-time apps need fast models. DeepSeek V4 and Gemini Flash are your friends. Batch processing can tolerate slower, more thorough models like Claude Opus 4.</li><li><strong>What's your cost tolerance?</strong> If you're processing millions of tokens daily, even small per-token differences compound. Use Token Hacker's pricing page to compare.</li><li><strong>Do you need multimodal?</strong> Vision tasks narrow the field significantly. GPT-5.4 and Gemini 2.5 Pro are the top multimodal options.</li></ol>
<h2>The Token Hacker Advantage</h2>
<p>The entire premise of Token Hacker is that you <strong>shouldn't have to commit to one model</strong>. With a single API key, you can try all of them. Start with the budget pick. If the output quality isn't good enough, swap in the top pick — it's a one-line change. If a new model drops that outperforms everything, you can test it within minutes. No new accounts, no new billing, no new SDK integration.</p>
<blockquote>With Token Hacker, model selection isn't a one-time decision. It's a dynamic optimization you can tune per-request.</blockquote>
<h2>Pro Tips</h2>
<ul><li><strong>Start cheap, upgrade when needed.</strong> Route every request to DeepSeek V4 or Gemini Flash first. Only escalate to Opus/GPT-5.4 when the cheap model's output doesn't meet quality thresholds.</li><li><strong>Cache aggressively.</strong> For identical prompts (system messages, few-shot examples), cache the response. Token Hacker supports standard OpenAI-compatible caching headers.</li><li><strong>Use streaming for UX.</strong> All models on Token Hacker support SSE streaming. Enable it for any user-facing application — the perceived latency improvement is dramatic.</li><li><strong>Monitor model performance.</strong> Log which model handled each request and track quality metrics. Over time, you'll build a data-driven understanding of which model works best for which task type.</li><li><strong>Set fallback chains.</strong> Configure your app to try Model A first, and if it fails (rate limit, timeout, error), automatically fall back to Model B. Token Hacker's unified endpoint makes this trivial.</li></ul>`);

// --- EN: migrate-5min ---
const en_migrate = esc(`<h2>Why Migrate?</h2>
<p>If you're using the OpenAI API directly, you're overpaying and limiting yourself to one provider's models. Token Hacker gives you the <strong>exact same API interface</strong> — OpenAI-compatible — but with access to 200+ models from every major provider, at prices typically 20-50% lower. Same code, more choice, less money. Here's how to make the switch in under five minutes.</p>
<h2>Step 1 — Get Your API Key</h2>
<p>Head to <a href="https://aiapisave.xyz">aiapisave.xyz</a> and sign up. GitHub OAuth means no email verification, no waiting. Once logged in, go to your dashboard and copy your API key. It looks like this: <code>th-sk-xxxxxxxxxxxxxxxxxxxxxxxx</code>.</p>
<p>Top up your balance via Stripe (credit card) or USDT-TRC20. Any amount works — there's no minimum. Your balance never expires.</p>
<h2>Step 2 — Change Two Lines</h2>
<p>The migration is literally two changes in your code:</p>
<ol><li><strong>Base URL:</strong> Change from <code>https://api.openai.com/v1</code> to <code>https://api.aiapisave.xyz/v1</code></li><li><strong>API Key:</strong> Replace your OpenAI key with your Token Hacker key (starts with <code>th-sk-</code>)</li></ol>
<p>That's it. Every OpenAI-compatible library, SDK, and tool works unchanged. The request and response formats are identical.</p>
<h2>Step 3 — Code Examples</h2>
<h3>Python</h3>
<p>Before (OpenAI):</p>
<pre><code>from openai import OpenAI

client = OpenAI(api_key="sk-...")

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello!"}]
)
print(response.choices[0].message.content)</code></pre>
<p>After (Token Hacker):</p>
<pre><code>from openai import OpenAI

client = OpenAI(
    api_key="th-sk-your-key-here",
    base_url="https://api.aiapisave.xyz/v1"
)

response = client.chat.completions.create(
    model="gpt-4o",  # Same model name — or try "claude-sonnet-4", "deepseek-v4"
    messages=[{"role": "user", "content": "Hello!"}]
)
print(response.choices[0].message.content)</code></pre>
<h3>Node.js</h3>
<p>Before (OpenAI):</p>
<pre><code>import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: 'sk-...' });

const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Hello!' }],
});
console.log(response.choices[0].message.content);</code></pre>
<p>After (Token Hacker):</p>
<pre><code>import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'th-sk-your-key-here',
  baseURL: 'https://api.aiapisave.xyz/v1',
});

const response = await openai.chat.completions.create({
  model: 'claude-sonnet-4',  // Try any model!
  messages: [{ role: 'user', content: 'Hello!' }],
});
console.log(response.choices[0].message.content);</code></pre>
<h3>cURL</h3>
<p>Before (OpenAI):</p>
<pre><code>curl https://api.openai.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-..." \\
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello!"}]}'</code></pre>
<p>After (Token Hacker):</p>
<pre><code>curl https://api.aiapisave.xyz/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer th-sk-your-key-here" \\
  -d '{"model":"deepseek-v4","messages":[{"role":"user","content":"Hello!"}]}'</code></pre>
<h2>Advanced: Multi-Model Routing</h2>
<p>Once you're on Token Hacker, you can build intelligent model routing. Here's a Python example that picks the best model based on task type:</p>
<pre><code>from openai import OpenAI

client = OpenAI(
    api_key="th-sk-your-key-here",
    base_url="https://api.aiapisave.xyz/v1"
)

def smart_chat(prompt, task_type="general"):
    model_map = {
        "coding": "claude-sonnet-4",
        "reasoning": "claude-opus-4",
        "creative": "claude-opus-4",
        "fast": "deepseek-v4",
        "vision": "gpt-5.4",
        "general": "gpt-4o",
    }
    model = model_map.get(task_type, "gpt-4o")
    return client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}]
    )

# Same client, different models — all through one API key
code_review = smart_chat("Review this function for bugs", "coding")
analysis = smart_chat("Analyze this market trend", "reasoning")
quick_answer = smart_chat("What's 2+2?", "fast")</code></pre>
<h2>What About My Existing Code?</h2>
<p><strong>Short answer: it works.</strong> Token Hacker implements the full OpenAI chat completions API, including:</p>
<ul><li>Streaming responses (SSE)</li><li>Function calling / tool use</li><li>JSON mode and structured outputs</li><li>System messages and multi-turn conversations</li><li>Temperature, top_p, max_tokens, and all standard parameters</li><li>Vision (image inputs via base64 or URL)</li></ul>
<p>Libraries like LangChain, LlamaIndex, Vercel AI SDK, and continue.dev all work without modification. Just point them at Token Hacker's base URL.</p>
<h2>Common Questions</h2>
<p><strong>Q: Is the response format identical?</strong><br>Yes. The JSON response structure matches OpenAI's exactly. <code>choices[0].message.content</code>, <code>usage.prompt_tokens</code>, <code>usage.completion_tokens</code> — all the same fields in the same places.</p>
<p><strong>Q: What about streaming?</strong><br>Fully supported. SSE streaming works identically. All streaming clients (including browser-based ones) work without changes.</p>
<p><strong>Q: Will my rate limits change?</strong><br>Token Hacker provides generous default rate limits. If you need higher limits, reach out through the dashboard — we're happy to accommodate production workloads.</p>
<p><strong>Q: Can I still use OpenAI models?</strong><br>Yes! GPT-4o, GPT-5.4, and all OpenAI models are available through Token Hacker. You get the same models, often at better prices, plus access to every other provider's models through the same key.</p>
<p><strong>Q: What if something goes wrong?</strong><br>Token Hacker provides detailed error responses in the same format as OpenAI, plus a dashboard with real-time usage monitoring. Support is available via the website.</p>`);

// --- ZH: why-aggregator ---
const zh_why = esc(`<h2>API Key 之乱</h2>
<p>如果你在 2026 年构建 AI 应用，你一定懂这种痛。最开始你用 OpenAI——一个 API Key，简单明了。然后发现 Claude Opus 在推理测试上碾压全场，于是又注册了 Anthropic。接着 DeepSeek 以惊人的低价杀出，你又开了一个账号。再然后 Google 推出 Gemini 2.5 Pro，200 万 Token 上下文窗口……不知不觉间，你已经在 5 到 10 个不同平台上管理着一堆 API Key，每个都有独立的计费周期、速率限制和 SDK 差异。</p>
<p>管理多个 AI 提供商不仅是麻烦——更是昂贵的认知负担。你要检查多个仪表盘看用量、月底对多份账单、学习各不相同的 API 规范、每次想测试不同模型都要重写集成代码。这种摩擦在 2026 年根本不应该存在。</p>
<h2>什么是 AI API 聚合平台？</h2>
<p>AI API 聚合平台是位于你的应用和多个 AI 模型提供商之间的中间层。你不再直接调用 OpenAI 的 API，而是调用聚合平台的统一 API——聚合平台透明地将请求路由到你指定的任何模型。你获得<strong>一个 API Key</strong>、<strong>一个接口地址</strong>、<strong>一个计费账户</strong>，以及即时访问所有主流提供商的 200+ 模型。</p>
<p>打个比方，就像支付网关。你用 Visa 卡在商店刷卡时，不需要和每家银行单独建立关系。支付网关处理所有路由。AI API 聚合平台对大语言模型做的事，和支付网关对银行卡做的事一样。</p>
<blockquote>Token Hacker 是你应用与市场上所有主流 AI 模型之间的通用翻译层。</blockquote>
<h2>核心优势</h2>
<h3>一个 Key 通吃</h3>
<p>一个 API Key 即可解锁 GPT-5.4、Claude Opus 4、Claude Sonnet 4、Gemini 2.5 Pro、DeepSeek V4、Qwen、Llama、Mistral 等 200+ 模型。不用再在环境变量里存十几个密钥，不用写条件判断来路由请求到不同提供商。一个 Key，一个接口，全搞定。</p>
<h3>成本优化</h3>
<p>聚合平台与提供商谈判获得批量折扣，将节省的成本传递给用户。Token Hacker 的价格通常比官方直连 API <strong>低 20-50%</strong>。比如 GPT-4o 官方直连可能要 $15/百万 Token，通过聚合平台可能只需要 $8/百万 Token。对于一个每月消耗 5000 万 Token 的生产应用来说，这是真金白银的节省。</p>
<h3>不被供应商锁定</h3>
<p>当你直接基于 OpenAI API 构建应用时，切换到 Claude 意味着更换 SDK、重写请求格式、甚至重构响应解析逻辑。使用聚合平台，切换模型只需改一行代码。如果 Anthropic 宕机，无缝切换到 GPT。如果 DeepSeek 涨价，试试 Gemini。你的基础设施与任何单一提供商解耦。</p>
<h3>即时访问新模型</h3>
<p>某个周二下午发布了新模型？几小时内——有时几分钟内——就能在 Token Hacker 上使用。无需重新注册、无需 KYC、无需配置计费。只需在代码里改一下模型名称字符串，就能立即使用。在 2026 年日新月异的 AI 格局中，这种敏捷性就是竞争优势。</p>
<h2>聚合平台 vs 直连 — 对比一览</h2>
<table><thead><tr><th>对比维度</th><th>API 聚合平台 (Token Hacker)</th><th>直连提供商</th></tr></thead><tbody><tr><td><strong>需管理的 API Key</strong></td><td>1 个 Key 覆盖 200+ 模型</td><td>每个提供商 1 个 Key（5-10 个）</td></tr><tr><td><strong>计费方式</strong></td><td>单一预付费余额，支持银行卡或 USDT</td><td>多份月度账单，各自独立的支付方式</td></tr><tr><td><strong>切换模型</strong></td><td>代码中改一个字符串</td><td>新 SDK、新认证、新响应解析</td></tr><tr><td><strong>价格</strong></td><td>批量谈判价，比零售价低 20-50%</td><td>零售/按量付费价格</td></tr><tr><td><strong>新模型接入</strong></td><td>发布后数小时内可用</td><td>每个新提供商需重新注册、KYC、配置计费</td></tr><tr><td><strong>故障切换</strong></td><td>自动：更换模型名称即可</td><td>手动：需提前在备用提供商开户</td></tr><tr><td><strong>技术支持</strong></td><td>单一联系点</td><td>每家提供商各自的支持渠道</td></tr></tbody></table>
<h2>为什么选择 Token Hacker？</h2>
<h3>预付费，无订阅</h3>
<p>大多数聚合平台用月度订阅锁定用户，还有最低消费要求。Token Hacker 不同：<strong>纯预付费</strong>。通过 Stripe（信用卡）或 USDT-TRC20（加密货币）充值任意金额。余额永不过期。无月度最低消费。没有你忘记取消的自动续费。用多少付多少，随时充值。这对独立开发者、创业公司和任何厌倦订阅制的人来说尤其友好。</p>
<h3>OpenAI 兼容 — 真正的即插即用</h3>
<p>Token Hacker 的 API 完全兼容 OpenAI。这意味着任何为 OpenAI 构建的库、SDK 或工具都能直接使用。Python 的 <code>openai</code> 包、LangChain、LlamaIndex、Vercel AI SDK、continue.dev——它们都可以通过修改两个配置值来接入 Token Hacker：Base URL 和 API Key。无需学习新库，无需重写代码。</p>
<h3>200+ 模型，覆盖所有主流提供商</h3>
<p>从 GPT-5.4、Claude Opus 4 这样的前沿模型，到 DeepSeek V4、Gemini 2.5 Flash 这样的性价比之王，Token Hacker 覆盖了全谱系。对话、推理、视觉、嵌入、图像生成、TTS——所有模型类型，一网打尽。访问 <a href="https://aiapisave.xyz">aiapisave.xyz</a> 浏览完整目录。</p>
<h2>实战示例</h2>
<p>以下 Python 示例展示了切换模型真的只是改一个字符串：</p>
<pre><code>from openai import OpenAI

client = OpenAI(
    api_key="th-sk-your-key-here",
    base_url="https://api.aiapisave.xyz/v1"
)

# 用 GPT-5.4 处理复杂推理
response = client.chat.completions.create(
    model="gpt-5.4",
    messages=[{"role": "user", "content": "解释量子纠缠"}]
)

# 切换到 Claude Opus 4 — 只需改一行！
response = client.chat.completions.create(
    model="claude-opus-4",  # 仅此而已，其他代码完全不变
    messages=[{"role": "user", "content": "解释量子纠缠"}]
)

# 需要省钱方案？试试 DeepSeek V4
response = client.chat.completions.create(
    model="deepseek-v4",  # 同样的代码，十分之一的价格
    messages=[{"role": "user", "content": "解释量子纠缠"}]
)</code></pre>
<p>无需额外导入 SDK。无需不同的请求格式。无需单独的错误处理。聚合平台在背后透明地处理所有提供商的差异。</p>
<h2>总结</h2>
<p>AI API 聚合平台不仅仅是便利工具——它是一项战略性架构决策。它将你的应用与任何单一模型提供商解耦，让你即时访问每个新模型，并通过批量定价为你节省真金白银。Token Hacker 将这一点与预付费灵活性（无订阅）、加密货币支付支持和真正的 OpenAI 兼容性相结合。如果你在 2026 年构建 AI 应用，用不用聚合平台不是问题——选哪一家才是。<a href="https://aiapisave.xyz">今天就试试 Token Hacker</a>。</p>`);

// --- ZH: model-choosing-guide ---
const zh_model = esc(`<h2>模型迷宫</h2>
<p>到了 2026 年，AI 模型的数量令人眼花缭乱。至少六大主流提供商推出了几十个模型，每个都声称自己在某方面最强。GPT-5.4 通用能力突出。Claude Opus 4 称霸推理基准。Claude Sonnet 4 是编程冠军。DeepSeek V4 以极低成本提供接近前沿模型的性能。Gemini 2.5 Pro 拥有 200 万 Token 的上下文窗口。而且每周还有新模型发布。</p>
<p>选择多是好事——但当你面对一个有 200+ 选项的模型选择器时，不确定哪个对你的具体场景最有效，那就头大了。选错了意味着浪费 Token、响应变慢，或者输出不达标。这篇指南给你一套实用框架，帮你在每次选模型时都能做出正确决策。</p>
<h2>模型分类速览</h2>
<table><thead><tr><th>类别</th><th>最适合</th><th>首选</th><th>省钱之选</th></tr></thead><tbody><tr><td><strong>通用对话</strong></td><td>客服、问答、日常任务</td><td>GPT-5.4</td><td>Gemini 2.5 Flash</td></tr><tr><td><strong>编程开发</strong></td><td>代码生成、调试、重构</td><td>Claude Sonnet 4</td><td>DeepSeek V4</td></tr><tr><td><strong>深度推理</strong></td><td>数学、逻辑、研究、多步骤问题</td><td>Claude Opus 4</td><td>GPT-4o</td></tr><tr><td><strong>创意写作</strong></td><td>内容创作、故事叙述、营销文案</td><td>Claude Opus 4</td><td>GPT-4o</td></tr><tr><td><strong>视觉/多模态</strong></td><td>图像分析、OCR、图表解读</td><td>GPT-5.4</td><td>Gemini 2.5 Pro</td></tr><tr><td><strong>省钱/快速</strong></td><td>高并发、低延迟、简单任务</td><td>DeepSeek V4</td><td>Gemini 2.5 Flash</td></tr></tbody></table>
<h2>场景深度分析</h2>
<h3>编程与开发</h3>
<p>在代码生成和调试方面，<strong>Claude Sonnet 4</strong> 是当前领跑者。它生成的代码干净、地道，幻觉比竞争对手更少。它能很好地理解大型代码库，并在长对话中保持上下文。对于预算敏感的项目，<strong>DeepSeek V4</strong> 以大约十分之一的价格提供令人惊讶的代码质量。<strong>GPT-4o</strong> 如果你已经在 OpenAI 生态中，它仍然是一个可靠的全能选手。</p>
<p>高级技巧：用 DeepSeek V4 生成样板代码，用 Claude Sonnet 4 处理复杂架构决策。根据任务复杂度灵活切换。</p>
<h3>深度推理与分析</h3>
<p>当你需要一个模型来思考复杂逻辑链、数学证明或多步骤分析时，<strong>Claude Opus 4</strong> 是黄金标准。它的扩展思考模式产生真正有洞察力的详细思维链推理。<strong>GPT-5.4</strong> 紧随其后，尤其在需要广博世界知识配合推理的问题上表现出色。</p>
<p>Token Hacker 通过同一个接口支持这两个模型，因此你可以在不改动任何基础设施的情况下 A/B 测试哪个模型在你的具体推理任务上表现更好。</p>
<h3>创意写作与内容</h3>
<p><strong>Claude Opus 4</strong> 在创意写作、故事叙述和细腻内容方面产生最自然、最像人类的文字。它的输出比其他模型更少公式化，更有个人风格。<strong>GPT-4o</strong> 在结构化内容方面表现出色，如文档、技术写作和需要遵循特定指南的营销文案。</p>
<h3>预算敏感项目</h3>
<p><strong>Gemini 2.5 Pro</strong> 和 <strong>DeepSeek V4</strong> 提供了令人难以置信的性价比。对于摘要、分类、数据提取和简单问答等任务，这些模型的性能几乎与前沿模型相当，而成本只有很小一部分。一个典型的应用可以通过将简单任务路由到这些模型、将复杂推理留给 Opus 或 GPT-5.4，节省 60-80% 的 API 成本。</p>
<h2>决策框架</h2>
<p>在选择模型前问自己这四个问题：</p>
<ol><li><strong>任务复杂度如何？</strong>简单任务（分类、提取）→ 省钱模型。复杂任务（推理、创意）→ 前沿模型。</li><li><strong>延迟要求多高？</strong>实时应用需要快速模型。DeepSeek V4 和 Gemini Flash 是你的朋友。批处理可以容忍更慢但更深入的模型如 Claude Opus 4。</li><li><strong>成本承受力如何？</strong>如果你每天处理数百万 Token，即使很小的单 Token 价格差异也会累积。使用 Token Hacker 的定价页面对比。</li><li><strong>需要多模态吗？</strong>视觉任务会大大缩小选择范围。GPT-5.4 和 Gemini 2.5 Pro 是顶级多模态选项。</li></ol>
<h2>Token Hacker 的优势</h2>
<p>Token Hacker 的核心理念是：你<strong>不应该被绑定到单一模型上</strong>。用一个 API Key，你可以尝试所有模型。从省钱之选开始。如果输出质量不够好，换到首选——只是一行代码的事。如果有新模型发布并且超越了一切，你可以在几分钟内测试它。无需新账号、无需新计费、无需新 SDK 集成。</p>
<blockquote>使用 Token Hacker，模型选择不是一次性的决定，而是可以按每次请求动态优化的策略。</blockquote>
<h2>实用技巧</h2>
<ul><li><strong>从便宜的模型开始，需要时升级。</strong>先把每个请求路由到 DeepSeek V4 或 Gemini Flash。只有当便宜模型的输出不满足质量阈值时才升级到 Opus/GPT-5.4。</li><li><strong>积极使用缓存。</strong>对于相同的提示词（系统消息、few-shot 示例），缓存响应。Token Hacker 支持标准的 OpenAI 兼容缓存头。</li><li><strong>用流式传输提升体验。</strong>Token Hacker 上所有模型都支持 SSE 流式传输。在任何面向用户的应用中启用它——感知延迟的改善是显著的。</li><li><strong>监控模型表现。</strong>记录每个请求使用了哪个模型并追踪质量指标。随着时间推移，你将建立起基于数据的理解：哪个模型对哪种任务类型效果最好。</li><li><strong>设置回退链。</strong>将应用配置为先尝试模型 A，如果失败（速率限制、超时、错误），自动回退到模型 B。Token Hacker 的统一接口让这变得简单。</li></ul>`);

// --- ZH: migrate-5min ---
const zh_migrate = esc(`<h2>为什么要迁移？</h2>
<p>如果你正在直接使用 OpenAI API，那你正在多花钱，而且把自己局限在一家提供商的模型里。Token Hacker 提供<strong>完全相同的 API 接口</strong>——OpenAI 兼容——但可以访问所有主流提供商的 200+ 模型，价格通常低 20-50%。同样的代码，更多选择，更少花费。下面教你如何在五分钟内完成切换。</p>
<h2>第一步 — 获取你的 API Key</h2>
<p>前往 <a href="https://aiapisave.xyz">aiapisave.xyz</a> 注册。GitHub OAuth 一键登录，无需邮箱验证，无需等待。登录后，进入控制台复制你的 API Key。它的格式类似：<code>th-sk-xxxxxxxxxxxxxxxxxxxxxxxx</code>。</p>
<p>通过 Stripe（信用卡）或 USDT-TRC20 充值余额。任意金额都可以——没有最低限额。余额永不过期。</p>
<h2>第二步 — 改两行代码</h2>
<p>迁移就是代码里的两个改动：</p>
<ol><li><strong>Base URL：</strong>从 <code>https://api.openai.com/v1</code> 改为 <code>https://api.aiapisave.xyz/v1</code></li><li><strong>API Key：</strong>将 OpenAI Key 替换为 Token Hacker Key（以 <code>th-sk-</code> 开头）</li></ol>
<p>仅此而已。所有 OpenAI 兼容的库、SDK 和工具无需改动即可运行。请求和响应格式完全一致。</p>
<h2>第三步 — 代码示例</h2>
<h3>Python</h3>
<p>迁移前（OpenAI）：</p>
<pre><code>from openai import OpenAI

client = OpenAI(api_key="sk-...")

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "你好！"}]
)
print(response.choices[0].message.content)</code></pre>
<p>迁移后（Token Hacker）：</p>
<pre><code>from openai import OpenAI

client = OpenAI(
    api_key="th-sk-your-key-here",
    base_url="https://api.aiapisave.xyz/v1"
)

response = client.chat.completions.create(
    model="gpt-4o",  # 同样的模型名——或试试 "claude-sonnet-4", "deepseek-v4"
    messages=[{"role": "user", "content": "你好！"}]
)
print(response.choices[0].message.content)</code></pre>
<h3>Node.js</h3>
<p>迁移前（OpenAI）：</p>
<pre><code>import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: 'sk-...' });

const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: '你好！' }],
});
console.log(response.choices[0].message.content);</code></pre>
<p>迁移后（Token Hacker）：</p>
<pre><code>import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'th-sk-your-key-here',
  baseURL: 'https://api.aiapisave.xyz/v1',
});

const response = await openai.chat.completions.create({
  model: 'claude-sonnet-4',  // 随意尝试任何模型！
  messages: [{ role: 'user', content: '你好！' }],
});
console.log(response.choices[0].message.content);</code></pre>
<h3>cURL</h3>
<p>迁移前（OpenAI）：</p>
<pre><code>curl https://api.openai.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-..." \\
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"你好！"}]}'</code></pre>
<p>迁移后（Token Hacker）：</p>
<pre><code>curl https://api.aiapisave.xyz/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer th-sk-your-key-here" \\
  -d '{"model":"deepseek-v4","messages":[{"role":"user","content":"你好！"}]}'</code></pre>
<h2>进阶：多模型路由</h2>
<p>接入 Token Hacker 后，你可以构建智能模型路由。以下是 Python 示例，根据任务类型自动选择最佳模型：</p>
<pre><code>from openai import OpenAI

client = OpenAI(
    api_key="th-sk-your-key-here",
    base_url="https://api.aiapisave.xyz/v1"
)

def smart_chat(prompt, task_type="general"):
    model_map = {
        "coding": "claude-sonnet-4",
        "reasoning": "claude-opus-4",
        "creative": "claude-opus-4",
        "fast": "deepseek-v4",
        "vision": "gpt-5.4",
        "general": "gpt-4o",
    }
    model = model_map.get(task_type, "gpt-4o")
    return client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}]
    )

# 同一个客户端，不同模型——全部通过一个 API Key
code_review = smart_chat("审查这个函数的潜在 bug", "coding")
analysis = smart_chat("分析这个市场趋势", "reasoning")
quick_answer = smart_chat("1+1等于几？", "fast")</code></pre>
<h2>现有代码怎么办？</h2>
<p><strong>简短回答：直接能用。</strong>Token Hacker 完整实现了 OpenAI Chat Completions API，包括：</p>
<ul><li>流式响应（SSE）</li><li>函数调用 / 工具使用</li><li>JSON 模式和结构化输出</li><li>系统消息和多轮对话</li><li>temperature、top_p、max_tokens 及所有标准参数</li><li>视觉（通过 base64 或 URL 输入图像）</li></ul>
<p>LangChain、LlamaIndex、Vercel AI SDK、continue.dev 等库无需修改即可运行。只需将它们指向 Token Hacker 的 Base URL 即可。</p>
<h2>常见问题</h2>
<p><strong>Q: 响应格式完全一样吗？</strong><br>是的。JSON 响应结构与 OpenAI 完全一致。<code>choices[0].message.content</code>、<code>usage.prompt_tokens</code>、<code>usage.completion_tokens</code>——所有字段都在相同的位置。</p>
<p><strong>Q: 流式传输支持吗？</strong><br>完全支持。SSE 流式传输与 OpenAI 行为一致。所有流式客户端（包括基于浏览器的）无需改动即可使用。</p>
<p><strong>Q: 速率限制会变吗？</strong><br>Token Hacker 提供慷慨的默认速率限制。如果需要更高限制，通过控制台联系我们——我们很乐意支持生产级工作负载。</p>
<p><strong>Q: 还能用 OpenAI 的模型吗？</strong><br>当然可以！GPT-4o、GPT-5.4 以及所有 OpenAI 模型都可以通过 Token Hacker 使用。你获得同样的模型，通常价格更优惠，并且还能通过同一个 Key 访问所有其他提供商的模型。</p>
<p><strong>Q: 出问题了怎么办？</strong><br>Token Hacker 按 OpenAI 相同格式返回详细错误信息，并提供带有实时用量监控的仪表盘。技术支持可通过网站获取。</p>`);

// ===== APPLY REPLACEMENTS =====

// EN articles: match date line and add content after it
const enArticles = [
  { date: "2026-06-12", content: en_why },
  { date: "2026-06-10", content: en_model },
  { date: "2026-06-08", content: en_migrate },
];

for (const art of enArticles) {
  const oldLine = `          date: '${art.date}',`;
  const newLine = `          date: '${art.date}',\n          content: '${art.content}',`;
  const idx = src.indexOf(oldLine);
  if (idx === -1) { console.error('EN article not found: ' + art.date); process.exit(1); }
  // Only replace first occurrence (EN section appears first)
  src = src.replace(oldLine, newLine);
  console.log('✓ EN article with date ' + art.date + ' updated, content: ' + art.content.length + ' chars');
}

// Update EN type annotation (first occurrence)
src = src.replace(
  "} as Record<string, { title: string; desc: string; date: string }>",
  "} as Record<string, { title: string; desc: string; date: string; content: string }>"
);

// ZH articles: match date line and add content after it
const zhArticles = [
  { date: "2026-06-12", content: zh_why },
  { date: "2026-06-10", content: zh_model },
  { date: "2026-06-08", content: zh_migrate },
];

for (const art of zhArticles) {
  const oldLine = `          date: '${art.date}',`;
  // Find all occurrences and replace the last one (ZH section)
  let idx = 0;
  let pos = -1;
  for (let i = 0; i < 10; i++) {
    const p = src.indexOf(oldLine, pos + 1);
    if (p === -1) break;
    pos = p;
    idx = i;
  }
  if (pos === -1) { console.error('ZH article not found: ' + art.date); process.exit(1); }
  const newLine = `          date: '${art.date}',\n          content: '${art.content}',`;
  // Replace at the found position
  src = src.substring(0, pos) + newLine + src.substring(pos + oldLine.length);
  console.log('✓ ZH article with date ' + art.date + ' updated, content: ' + art.content.length + ' chars');
}

// Update ZH type annotation (second/last occurrence)
const typeMarker = "} as Record<string, { title: string; desc: string; date: string }>";
const lastIdx = src.lastIndexOf(typeMarker);
if (lastIdx === -1) { console.error('ZH type annotation not found'); process.exit(1); }
src = src.substring(0, lastIdx) + "} as Record<string, { title: string; desc: string; date: string; content: string }>" + src.substring(lastIdx + typeMarker.length);
console.log('✓ ZH type annotation updated');

// ===== VALIDATE =====
// Braces
let ob = 0, cb = 0;
for (const ch of src) { if (ch === '{') ob++; if (ch === '}') cb++; }
console.log('\nBraces: open=' + ob + ' close=' + cb + ' ' + (ob === cb ? '✓' : '✗ MISMATCH'));

// Check for multiple lines in content (shouldn't have any, since \n are escaped)
for (const line of src.split('\n')) {
  const trimmed = line.trim();
  if (trimmed.startsWith("content: '") && line.includes('\n')) {
    console.log('WARNING: content value spans multiple physical lines!');
  }
}

console.log('\nWriting file...');
fs.writeFileSync(filePath, src, 'utf8');
console.log('✓ Done! Total size: ' + src.length + ' chars');
