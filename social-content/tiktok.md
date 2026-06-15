# TikTok 内容包

## 🎬 视频风格指南

- **时长**: 15-45 秒（黄金前 3 秒必须有 hook）
- **画幅**: 9:16 竖屏
- **画面风格**: 深色 IDE + 屏幕录制为主，穿插 meme/表情包
- **音乐**: 电子/lo-fi/trending beats
- **字幕**: 白字绿边，大号居中，每屏不超过 6 个词
- **语速**: 快节奏，信息密集

---

## Video 1 — "The API Key Problem" (25s) 🔑

**Hook (0-3s):**
[画面：桌面，5 封来自不同 AI 公司的 billing 邮件快速弹出]
字幕："POV: You manage 5 AI API keys"

**Body (3-18s):**
[屏幕录制，快速切换不同 dashboard]
字幕/旁白：
"This is what most devs deal with ↓"

[OpenAI dashboard → 切画面]
"GPT-4o is great but $2.50/M tokens"

[Anthropic console → 切画面]
"Claude 4 is better at coding but..."

[Google AI Studio → 切画面]
"Gemini is cheap but limited"

[DeepSeek platform → 切画面]
"And DeepSeek needs China ID"

[回到一张汇总表，5 个 API key 并排]
字幕："5 keys. 5 bills. 5 headaches."

**Solution (18-23s):**
[切到 Token Hacker dashboard，一个统一的界面]
字幕：
"OR: One key. 200+ models."
"60% cheaper. No subscription."

**CTA (23-25s):**
Logo + "tokenhacker.vercel.app"
字幕："Link in bio 🔗"

**BGM**: 开始用紧张的电子音 → 中间渐强 → 解决时切换为轻松的 lo-fi

---

## Video 2 — "Save 60% on AI APIs" 💰 (20s)

**Hook (0-3s):**
[画面：计算器快速按下，旁边是 OpenAI 和 Token Hacker 的 logo]
字幕："I cut my AI bill by 60%"
"Here's how 👇"

**Body (3-16s):**
[分屏对比动画]

左屏：OpenAI 价格
右屏：Token Hacker 价格

一个一个模型跳出：
• GPT-4o: $2.50 → $1.09 💚
• Claude Sonnet 4: $3.00 → $1.20 💚
• DeepSeek V4: $2.00 → $1.33 💚

[每次左屏价格变灰缩小，右屏价格变绿放大]

[最后累加动画：月用量 50M tokens]
"$125/month → $55/month"
"Save: $840/year"

**Twist (16-19s):**
字幕："Same models. Same quality."
"Just... cheaper."

**CTA (19-20s):**
Logo + "tokenhacker.vercel.app"

**BGM**: Cash register sounds + upbeat electronic

---

## Video 3 — "Switch Models in 1 Line" 🔄 (15s)

**Hook (0-3s):**
[代码编辑器特写，model 参数高亮]
字幕："Watch me switch AI models"

**Body (3-12s):**
[屏幕录制，实时打字速度]

```
model="openai/gpt-4o"          → "General chat"
```

[光标移到下一行，快速改]
```
model="anthropic/claude-sonnet-4"  → "Best for coding"
```

[再改]
```
model="google/gemini-2.5-pro"     → "Fast & cheap"
```

[再改]
```
model="deepseek/deepseek-v4"      → "Best value"
```

[每次切换，右侧弹出模型特性文字，像游戏 combo 效果]

**Punch (12-14s):**
字幕："Just change one string."
"200+ models. Zero new code."

**CTA (14-15s):**
Logo

**BGM**: 快节奏 typing ASMR + 切换 whoosh 音效

---

## Video 4 — "OpenAI SDK + Claude = 🤯" (18s)

**Hook (0-3s):**
[画面：OpenAI logo 和 Anthropic logo 碰撞融合]
字幕："Call Claude 4 with OpenAI SDK?"
"YES. 🤯"

**Body (3-14s):**
[代码编辑器，一行行展示代码]

```python
from openai import OpenAI  # ← regular OpenAI SDK

client = OpenAI(
    base_url="https://api.aiapisave.xyz/v1",
    api_key="sk-..."
)

response = client.chat.completions.create(
    model="anthropic/claude-sonnet-4",  # ← CLAUDE!
    messages=[{"role": "user", "content": "Write a poem"}]
)
```

[代码高亮 "anthropic/claude-sonnet-4" 闪烁]
字幕逐行弹出对应说明：
"Same SDK you know"
"Change 2 lines"
"Now you're calling Claude"

[运行代码 → 终端弹出 Claude 的 poem 输出]
字幕："Claude 4. Via OpenAI SDK. 🤝"

**Punch (14-17s):**
字幕："One SDK. All models."
"No new libraries. No refactoring."

**CTA (17-18s):**
Logo + "tokenhacker.vercel.app"

**BGM**: 科技感电子，中段加入"惊喜"音效

---

## Video 5 — "Models Explained in 30s" 📖 (30s)

**Hook (0-3s):**
[画面：四个 AI 角色图标并排]
字幕："Which AI model is right for you?"
"30 second guide 👇"

**Body (3-25s):**
[每 5 秒切换一个模型，配合图标和场景动画]

**(3-8s) GPT-4o**
图标：瑞士军刀
字幕："GPT-4o = The Swiss Army Knife"
"Good at everything. Great at nothing."
"Use for: general tasks, prototyping"

**(8-13s) Claude Sonnet 4**
图标：🔧 扳手
字幕："Claude Sonnet 4 = The Craftsman"
"Best for coding. Clean output."
"Use for: development, debugging"

**(13-18s) DeepSeek V4**
图标：💸 省钱猪
字幕："DeepSeek V4 = The Budget King"
"Strong at code. Fraction of the cost."
"Use for: everyday work, algorithms"

**(18-23s) Gemini 2.5 Pro**
图标：⚡ 闪电
字幕："Gemini = The Speed Demon"
"Fast. Cheap. Multi-modal."
"Use for: quick tasks, image understanding"

**(23-25s)**
字幕："Mix and match. One key."

**CTA (25-30s):**
"Start testing → tokenhacker.vercel.app"
Logo

**BGM**: 轻快电子，每个模型切换时加入过渡音效

---

## Video 6 — "Devs React to Prices" 😱 (15s)

**Hook (0-2s):**
[文字弹出]
字幕："Devs when they see Token Hacker pricing"

**Body (2-12s):**
[用流行的反应视频格式，配合价格数据]

(2-5s) Surprised face meme + "GPT-4o = $1.09/M??"
(5-8s) "Wait... Claude = $1.20/M??"
(8-10s) Mind blown meme + "NO SUBSCRIPTION??"
(10-12s) Happy dance meme + "AND USDT PAYMENT??"

**CTA (12-15s):**
Logo + "tokenhacker.vercel.app"
字幕："Try it. Your wallet will thank you."

**BGM**: 渐进式 hype beat

---

## Video 7 — "From OpenAI to Token Hacker in 60s" 🚀 (45s)

**Hook (0-3s):**
[屏幕录制，代码编辑器]
字幕："Migrate from OpenAI in 60 seconds"
计时器开始倒数 60...59...58...

**Step 1 (3-10s):**
[浏览器打开 tokenhacker.vercel.app → 注册 → Dashboard → 复制 API Key]
字幕："① Sign up (10s) → Get your key"
计时器：50s

**Step 2 (10-25s):**
[代码编辑器中替换两行]
```python
# BEFORE
client = OpenAI(api_key="sk-openai-...")

# AFTER
client = OpenAI(
    base_url="https://api.aiapisave.xyz/v1",  # ← new line
    api_key="sk-th-..."                         # ← new key
)
```
字幕："② Change 2 lines (15s)"
计时器：35s

**Step 3 (25-35s):**
[改 model name]
```python
# BEFORE
model="gpt-4o"

# AFTER
model="openai/gpt-4o"  # ← add "openai/" prefix
```
字幕："③ Add prefix (10s)"
计时器：25s

**Step 4 (35-40s):**
[运行代码 → 终端返回成功]
```python
response = client.chat.completions.create(...)
print(response.choices[0].message.content)
```
输出: "Hello! I'm GPT-4o running through Token Hacker."
字幕："④ Run it (5s). Done. ✅"
计时器：20s... 停！

**Bonus (40-43s):**
字幕："BONUS: Now also try Claude, Gemini, DeepSeek"
"Same key. Same code."

**CTA (43-45s):**
Logo + "tokenhacker.vercel.app"

**BGM**: 紧张倒数节拍 → 成功后切换轻松 lo-fi

---

## Video 8 — "Crypto Payments for AI" 💎 (15s)

**Hook (0-3s):**
[USDT logo 动画 + AI 图标]
字幕："Pay for AI with crypto?"
"Now you can. 💎"

**Body (3-12s):**
[动画展示支付流程]
钱包 → USDT-TRC20 → Token Hacker → API Access → AI Models

字幕：
"No bank. No KYC."
"Send USDT. Get tokens."
"Use any AI model."

[展示支持的各种模型 logo 闪动]

**Punch (12-14s):**
字幕：
"Tokens for tokens."
"Crypto native. AI ready."

**CTA (14-15s):**
Logo + "tokenhacker.vercel.app"

**BGM**: Crypto/DeFi style beat + coin sounds

---

## 🎨 视频制作建议

### 制作工具
- **录屏**: OBS Studio
- **剪辑**: CapCut / DaVinci Resolve
- **字幕**: CapCut 自动字幕 + 手动调整样式
- **动画**: Canva / Keynote 动画导出
- **音效库**: Epidemic Sound / Artlist

### 发布技巧
1. **前 3 秒必须 hook** — 不行就重拍
2. **字幕在手机屏幕中间偏下 1/3 处** — 不被 TikTok UI 遮挡
3. **描述第一行放最重要的 CTA** — 折叠前可见
4. **Hashtags**: 3-5 个，1 个热门 + 2 个精准 + 2 个品牌
   - 例: #AI #DevHack #APITutorial #TokenHacker #Coding
5. **发布时间**: 美国 EST 10AM-12PM, 7PM-9PM

### Hashtag 策略
```text
#AIAPI #DevTools #APITutorial #CodingTok #TechTok
#AIForDevelopers #GPT4 #Claude #DeepSeek #APIEconomy
#TokenHacker #BuildInPublic #SaaS #DeveloperLife
```
