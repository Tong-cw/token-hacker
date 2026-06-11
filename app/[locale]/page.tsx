'use client';
import Link from 'next/link';
import { getTranslations, Locale } from '@/lib/i18n';
import Calculator from '@/components/Calculator';

const models = [
  { name: 'DeepSeek V4 Flash', capability: '通用对话 · 性价比王者', input: '¥1.4', output: '¥5.6', monthly: '≈ ¥45', tag: 'best', capabilityEn: 'General chat · Best value' },
  { name: 'DeepSeek V4 Pro', capability: '推理增强 · 复杂任务', input: '¥7.0', output: '¥28.0', monthly: '≈ ¥220', tag: 'rec', capabilityEn: 'Reasoning · Complex tasks' },
  { name: 'GPT-4o', capability: '多模态 · 全能选手', input: '$2.50 ≈ ¥18', output: '$10 ≈ ¥72', monthly: '≈ ¥680', tag: '', capabilityEn: 'Multimodal · All-rounder' },
  { name: 'Claude 4.6 Sonnet', capability: '写作推理 · 长上下文', input: '$3.0 ≈ ¥22', output: '$15 ≈ ¥108', monthly: '≈ ¥980', tag: '', capabilityEn: 'Writing · Long context' },
  { name: 'Gemini 3.1 Pro', capability: '谷歌生态 · 免费额度', input: '$1.25 ≈ ¥9', output: '$5 ≈ ¥36', monthly: '≈ ¥340', tag: '', capabilityEn: 'Google ecosystem · Free tier' },
  { name: 'Claude Opus 4.7', capability: '最强大 · 复杂推理', input: '$15 ≈ ¥108', output: '$75 ≈ ¥540', monthly: '≈ ¥4,900', tag: '', capabilityEn: 'Most powerful · Complex reasoning' },
];

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="badge">{t.hero.badge}</div>
        <h1>{t.hero.title1}<br />{t.hero.title2}</h1>
        <p>{t.hero.desc}</p>
        <div className="hero-cta">
          <a href="#pricing" className="btn btn-primary">{t.hero.cta1}</a>
          <a href="#calculator" className="btn btn-outline">{t.hero.cta2}</a>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="section" id="pricing">
        <div className="container">
          <h2 className="section-title">{t.pricing.title}</h2>
          <p className="section-subtitle">{t.pricing.subtitle}</p>

          <table className="price-table">
            <thead>
              <tr>
                <th>{t.pricing.model}</th>
                <th>{t.pricing.capability}</th>
                <th>{t.pricing.input}</th>
                <th>{t.pricing.output}</th>
                <th>{t.pricing.monthly}</th>
                <th>{t.pricing.recommend}</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m) => (
                <tr key={m.name}>
                  <td className="model-col">{m.name}</td>
                  <td style={{ color: 'var(--text-dim)' }}>
                    {locale === 'zh' ? m.capability : m.capabilityEn}
                  </td>
                  <td className="price-col">{m.input}</td>
                  <td className="price-col">{m.output}</td>
                  <td className="save-col">{m.monthly}</td>
                  <td>
                    {m.tag === 'best' && <span className="tag tag-best">{t.pricing.bestValue}</span>}
                    {m.tag === 'rec' && <span className="tag tag-rec">{t.pricing.recommended}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ textAlign: 'center', color: 'var(--text-dim)', marginTop: '1rem', fontSize: '0.85rem' }}>
            {t.pricing.footnote}
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="section" id="calculator" style={{ background: 'rgba(137,180,250,0.02)' }}>
        <div className="container">
          <h2 className="section-title">{t.calculator.title}</h2>
          <p className="section-subtitle">{t.calculator.subtitle}</p>
          <Calculator locale={locale} />
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section" id="blog">
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

      {/* CTA */}
      <section className="cta-section">
        <h2>{t.cta.title}</h2>
        <p>{t.cta.desc}</p>
        <Link href={`/${locale}/login`} className="btn btn-primary">{t.cta.button}</Link>
      </section>
    </>
  );
}
