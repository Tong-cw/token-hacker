'use client';
import Link from 'next/link';
import { getTranslations, Locale } from '@/lib/i18n';

const priceData = [
  { model: 'GPT-4o', provider: 'OpenAI', input: '$2.50', output: '$10.00' },
  { model: 'GPT-4o-mini', provider: 'OpenAI', input: '$0.15', output: '$0.60' },
  { model: 'GPT-5.4', provider: 'OpenAI', input: '$5.00', output: '$30.00' },
  { model: 'Claude 4.6 Sonnet', provider: 'Anthropic', input: '$3.00', output: '$15.00' },
  { model: 'Claude 4.6 Haiku', provider: 'Anthropic', input: '$0.80', output: '$4.00' },
  { model: 'Claude Opus 4.7', provider: 'Anthropic', input: '$15.00', output: '$75.00' },
  { model: 'Gemini 3.1 Pro', provider: 'Google', input: '$1.25', output: '$5.00' },
  { model: 'Gemini 3.1 Flash', provider: 'Google', input: '$0.15', output: '$0.60' },
  { model: 'DeepSeek V4 Pro', provider: 'DeepSeek', input: '$0.98', output: '$3.92' },
  { model: 'DeepSeek V4 Flash', provider: 'DeepSeek', input: '$0.14', output: '$0.56' },
  { model: 'DeepSeek R1-0528', provider: 'DeepSeek', input: '$0.55', output: '$2.19' },
  { model: 'Llama 4 Maverick', provider: 'Meta', input: '$0.20', output: '$0.60' },
  { model: 'Grok-4', provider: 'X.AI', input: '$2.00', output: '$8.00' },
  { model: 'Qwen 3 Max', provider: 'Qwen', input: '$0.56', output: '$1.68' },
  { model: 'Mistral Large 3', provider: 'Mistral', input: '$2.00', output: '$6.00' },
  { model: 'Mistral Small 3', provider: 'Mistral', input: '$0.10', output: '$0.30' },
];

export default function PricingPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale);

  return (
    <div className="pricing-page">
      {/* Header */}
      <section className="pricing-hero">
        <h1>{t.pricingPage.title}</h1>
        <p>{t.pricingPage.subtitle}</p>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className="section-title">{t.pricingPage.howTitle}</h2>
          <p className="section-subtitle" style={{ textAlign: 'left' }}>{t.pricingPage.howDesc}</p>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">{t.pricingPage.tableTitle}</h2>
          <table className="price-table">
            <thead>
              <tr>
                <th>{t.pricingPage.model}</th>
                <th>{t.pricingPage.provider}</th>
                <th>{t.pricingPage.input}</th>
                <th>{t.pricingPage.output}</th>
              </tr>
            </thead>
            <tbody>
              {priceData.map((p) => (
                <tr key={p.model}>
                  <td className="model-col">{p.model}</td>
                  <td style={{ color: 'var(--text-dim)' }}>{p.provider}</td>
                  <td className="price-col">{p.input}</td>
                  <td className="price-col">{p.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ textAlign: 'center', color: 'var(--text-dim)', marginTop: '1.5rem', fontSize: '0.85rem' }}>
            {t.pricingPage.note}
          </p>
        </div>
      </section>

      {/* Suggested Top-Ups */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">{t.pricingPage.topupTitle}</h2>
          <div className="topup-grid">
            <div className="topup-card">
              <h3>{t.pricingPreview.topup1}</h3>
              <div className="topup-price">{t.pricingPreview.topup1Price}</div>
              <p className="topup-desc">
                {t.pricingPreview.topup1Desc.split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </p>
            </div>
            <div className="topup-card topup-card-featured">
              <div className="topup-badge">{t.pricingPreview.popular}</div>
              <h3>{t.pricingPreview.topup2}</h3>
              <div className="topup-price">{t.pricingPreview.topup2Price}</div>
              <p className="topup-desc">
                {t.pricingPreview.topup2Desc.split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </p>
            </div>
            <div className="topup-card">
              <h3>{t.pricingPreview.topup3}</h3>
              <div className="topup-price">{t.pricingPreview.topup3Price}</div>
              <p className="topup-desc">
                {t.pricingPreview.topup3Desc.split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href={`/${locale}/login`} className="btn-primary">
              {t.cta.button}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
