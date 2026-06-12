'use client';
import Link from 'next/link';
import { getTranslations, Locale } from '@/lib/i18n';

export default function DocsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale);

  const baseUrl = 'https://api.aiapisave.xyz';

  return (
    <div className="docs-page">
      {/* Header */}
      <section className="pricing-hero">
        <h1>{t.docs.title}</h1>
        <p>{t.docs.subtitle}</p>
      </section>

      <div className="docs-layout">
        {/* Sidebar */}
        <aside className="docs-sidebar">
          <ul>
            <li><a href="#quickstart">{t.docs.quickstart}</a></li>
            <li><a href="#auth">{t.docs.auth}</a></li>
            <li><a href="#models">{t.docs.modelsRef}</a></li>
            <li><a href="#rate-limits">{t.docs.rateLimits}</a></li>
            <li><a href="#errors">{t.docs.errors}</a></li>
            <li><a href="#faq">{t.docs.faq}</a></li>
          </ul>
        </aside>

        {/* Content */}
        <main className="docs-content">
          {/* Quick Start */}
          <section id="quickstart" className="docs-section">
            <h2>{t.docs.quickstart}</h2>
            <p>Get your first AI response in under 5 minutes.</p>

            <h3>{t.docs.step1}</h3>
            <p>{t.docs.getKey} <Link href={`/${locale}/dashboard`} style={{ color: 'var(--accent)' }}>{t.docs.dashboard}</Link>.</p>

            <h3>{t.docs.step2}</h3>
            <pre className="docs-code"><code>pip install openai</code></pre>

            <h3>{t.docs.step3}</h3>
            <pre className="docs-code"><code>{`from openai import OpenAI

client = OpenAI(
    base_url="${baseUrl}/v1",
    api_key="sk-your-api-key",
)

response = client.chat.completions.create(
    model="openai/gpt-4o-mini",
    messages=[
        {"role": "user", "content": "Hello, world!"}
    ],
)

print(response.choices[0].message.content)`}</code></pre>
          </section>

          {/* Authentication */}
          <section id="auth" className="docs-section">
            <h2>{t.docs.auth}</h2>
            <p>All API requests require authentication via Bearer token in the <code>Authorization</code> header.</p>
            <table className="docs-table">
              <tbody>
                <tr>
                  <td className="docs-table-label">{t.docs.baseUrl}</td>
                  <td><code>{baseUrl}/v1</code></td>
                </tr>
                <tr>
                  <td className="docs-table-label">{t.docs.authHeader}</td>
                  <td><code>Authorization: Bearer sk-your-api-key</code></td>
                </tr>
                <tr>
                  <td className="docs-table-label">{t.docs.contentType}</td>
                  <td><code>application/json</code></td>
                </tr>
              </tbody>
            </table>
            <p>Your API key can be found in the <Link href={`/${locale}/dashboard`} style={{ color: 'var(--accent)' }}>Dashboard</Link> after signing in.</p>
          </section>

          {/* Models */}
          <section id="models" className="docs-section">
            <h2>{t.docs.modelsRef}</h2>
            <p>Token Hacker supports 200+ models across multiple providers. Browse the full list on the <Link href={`/${locale}/models`} style={{ color: 'var(--accent)' }}>Models page</Link>.</p>
            <p>Model IDs follow the format: <code>provider/model-name</code></p>
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Format</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>OpenAI</td><td><code>openai/model</code></td><td><code>openai/gpt-4o</code></td></tr>
                <tr><td>Anthropic</td><td><code>anthropic/model</code></td><td><code>anthropic/claude-sonnet</code></td></tr>
                <tr><td>Google</td><td><code>google/model</code></td><td><code>google/gemini-pro</code></td></tr>
                <tr><td>DeepSeek</td><td><code>deepseek/model</code></td><td><code>deepseek/deepseek-v4</code></td></tr>
                <tr><td>Meta</td><td><code>meta/model</code></td><td><code>meta/llama-4-maverick</code></td></tr>
              </tbody>
            </table>
          </section>

          {/* Rate Limits */}
          <section id="rate-limits" className="docs-section">
            <h2>{t.docs.rateLimits}</h2>
            <p>Rate limits depend on your account tier and current balance. Standard accounts have:</p>
            <ul>
              <li><strong>Requests per minute:</strong> 60 RPM</li>
              <li><strong>Tokens per minute:</strong> 100K TPM</li>
              <li><strong>Concurrent requests:</strong> 10</li>
            </ul>
            <p>When you hit a rate limit, the API returns HTTP <code>429 Too Many Requests</code>. Implement exponential backoff to handle this gracefully.</p>
            <pre className="docs-code"><code>{`import time

def call_with_retry(client, **kwargs):
    for attempt in range(5):
        try:
            return client.chat.completions.create(**kwargs)
        except Exception as e:
            if "429" in str(e):
                time.sleep(2 ** attempt)
                continue
            raise`}</code></pre>
          </section>

          {/* Errors */}
          <section id="errors" className="docs-section">
            <h2>{t.docs.errors}</h2>
            <table className="docs-table">
              <thead>
                <tr><th>Code</th><th>Meaning</th></tr>
              </thead>
              <tbody>
                <tr><td><code>401</code></td><td>Invalid or missing API key</td></tr>
                <tr><td><code>402</code></td><td>Insufficient balance — top up your account</td></tr>
                <tr><td><code>429</code></td><td>Rate limit exceeded — slow down requests</td></tr>
                <tr><td><code>500</code></td><td>Server error — retry with backoff</td></tr>
                <tr><td><code>503</code></td><td>Model temporarily unavailable — try another model</td></tr>
              </tbody>
            </table>
          </section>

          {/* FAQ */}
          <section id="faq" className="docs-section">
            <h2>{t.docs.faq}</h2>
            <div className="faq-item">
              <h4>Is the API OpenAI-compatible?</h4>
              <p>Yes. Token Hacker uses the same API format as OpenAI. Just change <code>base_url</code> to <code>{baseUrl}/v1</code> and your existing code works.</p>
            </div>
            <div className="faq-item">
              <h4>Does my balance expire?</h4>
              <p>No. Your prepaid balance never expires. Use it whenever you need it.</p>
            </div>
            <div className="faq-item">
              <h4>What payment methods are accepted?</h4>
              <p>We accept credit/debit cards (Visa, Mastercard) via Stripe, and USDT-TRC20 for crypto payments. More options coming soon.</p>
            </div>
            <div className="faq-item">
              <h4>Do you log my prompts?</h4>
              <p>No. We do not log or store your prompts or model outputs. Your data is your data.</p>
            </div>
            <div className="faq-item">
              <h4>Can I get a refund?</h4>
              <p>Prepaid balances are non-refundable. We recommend starting with a small amount to test the service.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
