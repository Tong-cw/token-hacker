'use client';
import Link from 'next/link';
import { getTranslations, Locale } from '@/lib/i18n';

export default function DocsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getTranslations(locale).docs;

  const baseUrl = 'https://api.aiapisave.xyz';

  return (
    <div className="docs-page">
      {/* Header */}
      <section className="pricing-hero">
        <h1>{d.title}</h1>
        <p>{d.subtitle}</p>
      </section>

      <div className="docs-layout">
        {/* Sidebar */}
        <aside className="docs-sidebar">
          <ul>
            <li><a href="#quickstart">{d.sidebar.quickstart}</a></li>
            <li><a href="#auth">{d.sidebar.auth}</a></li>
            <li><a href="#models">{d.sidebar.models}</a></li>
            <li><a href="#streaming">{d.sidebar.streaming}</a></li>
            <li><a href="#functions">{d.sidebar.functions}</a></li>
            <li><a href="#rate-limits">{d.sidebar.rateLimits}</a></li>
            <li><a href="#errors">{d.sidebar.errors}</a></li>
            <li><a href="#faq">{d.sidebar.faq}</a></li>
          </ul>
        </aside>

        {/* Content */}
        <main className="docs-content">
          {/* Quick Start */}
          <section id="quickstart" className="docs-section">
            <h2>{d.quickstart.title}</h2>
            <p>{d.quickstart.intro}</p>

            <h3>{d.quickstart.steps.step1.title}</h3>
            <p>{d.quickstart.steps.step1.desc}</p>

            <h3>{d.quickstart.steps.step2.title}</h3>
            <p>{d.quickstart.steps.step2.desc}</p>

            <h3>{d.quickstart.steps.step3.title}</h3>
            <p>{d.quickstart.steps.step3.desc}</p>

            <h4>Python</h4>
            <pre className="docs-code"><code>{d.quickstart.python}</code></pre>

            <h4>Node.js</h4>
            <pre className="docs-code"><code>{d.quickstart.nodejs}</code></pre>

            <h4>cURL</h4>
            <pre className="docs-code"><code>{d.quickstart.curl}</code></pre>

            <h4>Streaming (Python)</h4>
            <pre className="docs-code"><code>{d.quickstart.streamingPython}</code></pre>

            <h4>Streaming (Node.js)</h4>
            <pre className="docs-code"><code>{d.quickstart.streamingNode}</code></pre>

            <p style={{ marginTop: '1.5rem' }}>
              <Link href={`/${locale}/dashboard`} style={{ color: 'var(--accent)' }}>
                {d.quickstart.dashboard} →
              </Link>
            </p>
          </section>

          {/* Authentication */}
          <section id="auth" className="docs-section">
            <h2>{d.auth.title}</h2>
            <p>{d.auth.intro}</p>
            <table className="docs-table">
              <tbody>
                <tr>
                  <td className="docs-table-label">{d.auth.baseUrlLabel}</td>
                  <td><code>{d.auth.baseUrlValue}</code></td>
                </tr>
                <tr>
                  <td className="docs-table-label">{d.auth.authHeaderLabel}</td>
                  <td><code>{d.auth.authHeaderValue}</code></td>
                </tr>
                <tr>
                  <td className="docs-table-label">{d.auth.contentTypeLabel}</td>
                  <td><code>{d.auth.contentTypeValue}</code></td>
                </tr>
              </tbody>
            </table>
            <p>
              {d.auth.getKey}{' '}
              <Link href={`/${locale}/dashboard`} style={{ color: 'var(--accent)' }}>
                {d.auth.dashboard}
              </Link>.
            </p>
          </section>

          {/* Model Reference */}
          <section id="models" className="docs-section">
            <h2>{d.models.title}</h2>
            <p>{d.models.intro1}</p>
            <p>{d.models.intro2}</p>
            <table className="docs-table">
              <thead>
                <tr>
                  <th>{d.models.providerCol}</th>
                  <th>{d.models.formatCol}</th>
                  <th>{d.models.exampleCol}</th>
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
            <p>{d.models.formatNote}</p>
          </section>

          {/* Streaming */}
          <section id="streaming" className="docs-section">
            <h2>{d.streaming.title}</h2>
            <p>{d.streaming.intro}</p>

            <h4>Python</h4>
            <pre className="docs-code"><code>{d.streaming.python}</code></pre>

            <h4>Node.js</h4>
            <pre className="docs-code"><code>{d.streaming.nodejs}</code></pre>
          </section>

          {/* Function Calling */}
          <section id="functions" className="docs-section">
            <h2>{d.functions.title}</h2>
            <p>{d.functions.intro}</p>

            <h4>Python</h4>
            <pre className="docs-code"><code>{d.functions.python}</code></pre>
          </section>

          {/* Rate Limits */}
          <section id="rate-limits" className="docs-section">
            <h2>{d.rateLimits.title}</h2>
            <p>{d.rateLimits.intro}</p>
            <ul>
              <li><strong>{d.rateLimits.rpm}:</strong> 60 RPM</li>
              <li><strong>{d.rateLimits.tpm}:</strong> 100K TPM</li>
              <li><strong>{d.rateLimits.concurrent}:</strong> 10</li>
            </ul>
            <p>{d.rateLimits.rate429}</p>
            <pre className="docs-code"><code>{d.rateLimits.retryCode}</code></pre>
          </section>

          {/* Error Handling */}
          <section id="errors" className="docs-section">
            <h2>{d.errors.title}</h2>
            <p>{d.errors.intro}</p>
            <table className="docs-table">
              <thead>
                <tr>
                  <th>{d.errors.codeCol}</th>
                  <th>{d.errors.meaningCol}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>401</code></td><td>{d.errors.codes.code401}</td></tr>
                <tr><td><code>402</code></td><td>{d.errors.codes.code402}</td></tr>
                <tr><td><code>429</code></td><td>{d.errors.codes.code429}</td></tr>
                <tr><td><code>500</code></td><td>{d.errors.codes.code500}</td></tr>
                <tr><td><code>503</code></td><td>{d.errors.codes.code503}</td></tr>
              </tbody>
            </table>
          </section>

          {/* FAQ */}
          <section id="faq" className="docs-section">
            <h2>{d.faq.title}</h2>
            {d.faq.items.map((item, i) => (
              <div key={i} className="faq-item">
                <h4>{item.q}</h4>
                <p>{item.a}</p>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
