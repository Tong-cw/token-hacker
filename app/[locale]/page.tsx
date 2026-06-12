'use client';
import Link from 'next/link';
import { getTranslations, Locale } from '@/lib/i18n';

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre style={{
      background: '#0a0e14', border: '1px solid var(--border)',
      borderRadius: '10px', padding: '1.25rem 1.5rem',
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      fontSize: '0.88rem', lineHeight: 1.8, overflowX: 'auto',
      color: '#cdd6f4',
    }}>
      {children}
    </pre>
  );
}

const featuredModels = [
  { name: 'DeepSeek V4 Pro', provider: 'DeepSeek', input: '$0.98', output: '$3.92', tag: 'best' },
  { name: 'GPT-4o', provider: 'OpenAI', input: '$2.50', output: '$10.00', tag: '' },
  { name: 'Claude 4.6 Sonnet', provider: 'Anthropic', input: '$3.00', output: '$15.00', tag: 'rec' },
  { name: 'Gemini 3.1 Pro', provider: 'Google', input: '$1.25', output: '$5.00', tag: '' },
  { name: 'DeepSeek V4 Flash', provider: 'DeepSeek', input: '$0.14', output: '$0.56', tag: 'best' },
  { name: 'Claude Opus 4.7', provider: 'Anthropic', input: '$15.00', output: '$75.00', tag: '' },
];

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale);

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="hero-new">
        <div className="badge-new">{t.hero.badge}</div>
        <h1>
          {t.hero.title1}
          <br />
          <span className="hero-highlight">{t.hero.title2}</span>
        </h1>
        <p className="hero-desc">{t.hero.desc}</p>
        <div className="hero-cta">
          <Link href={`/${locale}/login`} className="btn-primary">
            {t.hero.cta1}
          </Link>
          <Link href={`/${locale}/models`} className="btn-outline">
            {t.hero.cta2}
          </Link>
        </div>

        {/* Provider logos */}
        <div className="provider-logos">
          <span>OpenAI</span>
          <span>Anthropic</span>
          <span>Google</span>
          <span>Meta</span>
          <span>DeepSeek</span>
          <span>X.AI</span>
          <span>Qwen</span>
          <span>Mistral</span>
        </div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">200+</span>
          <span className="stat-label">{t.stats.models}</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-icon">🔄</span>
          <span className="stat-label">{t.stats.compatible}</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-number">99.9%</span>
          <span className="stat-label">{t.stats.uptime}</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-icon">🪙</span>
          <span className="stat-label">{t.stats.payment}</span>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">{t.how.title}</h2>
          <p className="section-subtitle">{t.how.subtitle}</p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>{t.how.step1Title}</h3>
              <p>{t.how.step1Desc}</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>{t.how.step2Title}</h3>
              <p>{t.how.step2Desc}</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>{t.how.step3Title}</h3>
              <p>{t.how.step3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURED MODELS ==================== */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">{t.featuredModels.title}</h2>
          <p className="section-subtitle">{t.featuredModels.subtitle}</p>
          <div className="models-grid">
            {featuredModels.map((m) => (
              <div className="model-card" key={m.name}>
                <div className="model-card-header">
                  <span className="model-provider">{m.provider}</span>
                  {m.tag === 'best' && <span className="tag tag-best">{t.featuredModels.bestValue}</span>}
                  {m.tag === 'rec' && <span className="tag tag-rec">{t.featuredModels.recommended}</span>}
                </div>
                <h4 className="model-card-name">{m.name}</h4>
                <div className="model-card-pricing">
                  <div>
                    <span className="price-label">{t.models.inputPrice}</span>
                    <span className="price-value">{m.input}</span>
                  </div>
                  <div>
                    <span className="price-label">{t.models.outputPrice}</span>
                    <span className="price-value">{m.output}</span>
                  </div>
                </div>
                <span className="price-unit">{t.featuredModels.perMTokens}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href={`/${locale}/models`} className="btn-outline">
              {t.featuredModels.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== WHY TOKEN HACKER ==================== */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">{t.features.title}</h2>
          <p className="section-subtitle">{t.features.subtitle}</p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔑</div>
              <h3>{t.features.f0Title}</h3>
              <p>{t.features.f0Desc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>{t.features.f1Title}</h3>
              <p>{t.features.f1Desc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🪙</div>
              <h3>{t.features.f2Title}</h3>
              <p>{t.features.f2Desc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>{t.features.f3Title}</h3>
              <p>{t.features.f3Desc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>{t.features.f4Title}</h3>
              <p>{t.features.f4Desc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>{t.features.f5Title}</h3>
              <p>{t.features.f5Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CODE DEMO ==================== */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">{t.codeDemo.title}</h2>
          <p className="section-subtitle">{t.codeDemo.subtitle}</p>
          <div className="code-demo-box">
            <CodeBlock>
              <span style={{ color: '#6c7086' }}>{t.codeDemo.line1}</span><br />
              <span style={{ color: '#a6e3a1' }}>from</span> openai <span style={{ color: '#a6e3a1' }}>import</span> OpenAI<br /><br />
              <span style={{ color: '#89b4fa' }}>client</span> = OpenAI(<br />
              &nbsp;&nbsp;base_url=<span style={{ color: '#a6e3a1' }}>"https://api.aiapisave.xyz/v1"</span>,<br />
              &nbsp;&nbsp;api_key=<span style={{ color: '#a6e3a1' }}>"sk-your-key"</span>,<br />
              )<br /><br />
              <span style={{ color: '#6c7086' }}>{t.codeDemo.line3}</span><br /><br />
              response = <span style={{ color: '#89b4fa' }}>client</span>.chat.completions.create(<br />
              &nbsp;&nbsp;model=<span style={{ color: '#a6e3a1' }}>"anthropic/claude-sonnet"</span>,<br />
              &nbsp;&nbsp;messages=[{'{"role": "user", "content": "Hello!"}'}],<br />
              )<br /><br />
              <span style={{ color: '#6c7086' }}>{t.codeDemo.result}</span><br />
              <span style={{ color: '#a6e3a1' }}>print</span>(response.choices[0].message.content)
            </CodeBlock>
          </div>
        </div>
      </section>

      {/* ==================== PRICING PREVIEW ==================== */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">{t.pricingPreview.title}</h2>
          <p className="section-subtitle">{t.pricingPreview.subtitle}</p>
          <div className="topup-grid">
            <div className="topup-card">
              <h3>{t.pricingPreview.topup1}</h3>
              <div className="topup-price">{t.pricingPreview.topup1Price}</div>
              <p className="topup-desc">{t.pricingPreview.topup1Desc.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}</p>
            </div>
            <div className="topup-card topup-card-featured">
              <div className="topup-badge">{t.pricingPreview.popular}</div>
              <h3>{t.pricingPreview.topup2}</h3>
              <div className="topup-price">{t.pricingPreview.topup2Price}</div>
              <p className="topup-desc">{t.pricingPreview.topup2Desc.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}</p>
            </div>
            <div className="topup-card">
              <h3>{t.pricingPreview.topup3}</h3>
              <div className="topup-price">{t.pricingPreview.topup3Price}</div>
              <p className="topup-desc">{t.pricingPreview.topup3Desc.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href={`/${locale}/pricing`} className="btn-outline">
              {t.pricingPreview.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== BLOG PREVIEW ==================== */}
      <section className="section section-alt" id="blog">
        <div className="container">
          <h2 className="section-title">{t.blog.title}</h2>
          <p className="section-subtitle">{t.blog.subtitle}</p>
          <div className="blog-grid">
            {(Object.entries(t.blog.articles) as [string, { title: string; desc: string; date: string }][]).map(([slug, article]) => (
              <Link href={`/${locale}/blog/${slug}`} key={slug} className="blog-card">
                <div className="blog-card-date">{article.date}</div>
                <h3>{article.title}</h3>
                <p>{article.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="cta-section">
        <h2>{t.cta.title}</h2>
        <p>{t.cta.desc}</p>
        <Link href={`/${locale}/login`} className="btn-primary">{t.cta.button}</Link>
      </section>
    </>
  );
}
