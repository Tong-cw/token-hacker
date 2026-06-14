'use client';
import { useState } from 'react';
import Link from 'next/link';
import { getTranslations, Locale } from '@/lib/i18n';

type Group = 'all' | 'chat' | 'reasoning' | 'vision' | 'embedding' | 'image' | 'audio';

const allModels = [
  // Chat
  { model: 'GPT-4o', provider: 'OpenAI', input: '$1.09', output: '$4.38', group: 'chat' as Group },
  { model: 'GPT-4o-mini', provider: 'OpenAI', input: '$0.075', output: '$0.30', group: 'chat' as Group },
  { model: 'GPT-5.4', provider: 'OpenAI', input: '$0.73', output: '$4.38', group: 'chat' as Group },
  { model: 'Claude Sonnet 4', provider: 'Anthropic', input: '$1.20', output: '$6.00', group: 'chat' as Group },
  { model: 'Claude Haiku 4.5', provider: 'Anthropic', input: '$0.35', output: '$1.75', group: 'chat' as Group },
  { model: 'DeepSeek V4 Pro', provider: 'DeepSeek', input: '$1.88', output: '$3.75', group: 'chat' as Group },
  { model: 'DeepSeek V3.2', provider: 'DeepSeek', input: '$0.42', output: '$1.25', group: 'chat' as Group },
  { model: 'Llama 4 Maverick', provider: 'Meta', input: '$0.50', output: '$1.50', group: 'chat' as Group },
  { model: 'Grok 4', provider: 'X.AI', input: '$0.90', output: '$4.50', group: 'chat' as Group },
  { model: 'Qwen Max', provider: 'Qwen', input: '$0.75', output: '$3.00', group: 'chat' as Group },
  { model: 'Mistral Large 2', provider: 'Mistral', input: '$1.50', output: '$6.00', group: 'chat' as Group },
  { model: 'Kimi K2', provider: 'Moonshot', input: '$1.25', output: '$5.00', group: 'chat' as Group },
  // Reasoning
  { model: 'Claude Opus 4', provider: 'Anthropic', input: '$6.00', output: '$30.00', group: 'reasoning' as Group },
  { model: 'DeepSeek R1', provider: 'DeepSeek', input: '$1.00', output: '$4.00', group: 'reasoning' as Group },
  { model: 'o4-mini', provider: 'OpenAI', input: '$0.48', output: '$1.93', group: 'reasoning' as Group },
  { model: 'o3', provider: 'OpenAI', input: '$0.88', output: '$3.50', group: 'reasoning' as Group },
  // Vision
  { model: 'Gemini 2.5 Pro', provider: 'Google', input: '$0.23', output: '$1.88', group: 'vision' as Group },
  { model: 'Gemini 2.5 Flash', provider: 'Google', input: '$0.054', output: '$0.45', group: 'vision' as Group },
  { model: 'GPT-5.4', provider: 'OpenAI', input: '$0.73', output: '$4.38', group: 'vision' as Group },
  { model: 'Claude Sonnet 4', provider: 'Anthropic', input: '$1.20', output: '$6.00', group: 'vision' as Group },
  // Embedding
  { model: 'text-embedding-3-large', provider: 'OpenAI', input: '$0.026', output: '—', group: 'embedding' as Group },
  { model: 'text-embedding-3-small', provider: 'OpenAI', input: '$0.004', output: '—', group: 'embedding' as Group },
  { model: 'BGE-M3', provider: 'BAAI', input: '$0.005', output: '—', group: 'embedding' as Group },
  // Image
  { model: 'DALL-E 3', provider: 'OpenAI', input: '$0.040', output: 'per image', group: 'image' as Group },
  { model: 'Midjourney v7', provider: 'Midjourney', input: '$0.050', output: 'per image', group: 'image' as Group },
  { model: 'FLUX.1', provider: 'Black Forest', input: '$0.020', output: 'per image', group: 'image' as Group },
  // Audio
  { model: 'tts-1-hd', provider: 'OpenAI', input: '$0.030', output: '/1K chars', group: 'audio' as Group },
  { model: 'ElevenLabs v3', provider: 'ElevenLabs', input: '$0.015', output: '/1K chars', group: 'audio' as Group },
];

const groups: { key: Group; labelKey: string }[] = [
  { key: 'all', labelKey: 'all' },
  { key: 'chat', labelKey: 'chat' },
  { key: 'reasoning', labelKey: 'reasoning' },
  { key: 'vision', labelKey: 'vision' },
  { key: 'embedding', labelKey: 'embedding' },
  { key: 'image', labelKey: 'image' },
  { key: 'audio', labelKey: 'audio' },
];

export default function PricingPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale);
  const pt = t.pricingPage;
  const pg = t.pricingGroups;
  const ptp = t.pricingPreview;
  const [group, setGroup] = useState<Group>('all');

  const filtered = group === 'all' ? allModels : allModels.filter(m => m.group === group);

  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <h1>{pt.title}</h1>
        <p>{pt.subtitle}</p>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className="section-title">{pt.howTitle}</h2>
          <p className="section-subtitle" style={{ textAlign: 'left' }}>{pt.howDesc}</p>
        </div>
      </section>

      {/* Group tabs */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: '0.3rem' }}>{pg.tabs}</h2>
          <div className="pricing-groups-tabs">
            {groups.map(g => (
              <button
                key={g.key}
                className={`pricing-group-tab${group === g.key ? ' active' : ''}`}
                onClick={() => setGroup(g.key)}
              >
                {(pg as any)[g.labelKey]}
              </button>
            ))}
          </div>
          <p className="pricing-group-desc">
            {(pg.groupDesc as any)[group]}
          </p>

          {/* Pricing Table */}
          <table className="price-table">
            <thead>
              <tr>
                <th>{pt.model}</th>
                <th>{pt.provider}</th>
                <th>{pt.input}</th>
                <th>{pt.output}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
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
            {pt.note}
          </p>
        </div>
      </section>

      {/* Suggested Top-Ups */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">{pt.topupTitle}</h2>
          <div className="topup-grid">
            <div className="topup-card">
              <h3>{ptp.topup1}</h3>
              <div className="topup-price">$5</div>
              <p className="topup-desc">{ptp.topup1Desc}</p>
            </div>
            <div className="topup-card topup-card-featured">
              <span className="topup-badge">{ptp.popular}</span>
              <h3>{ptp.topup2}</h3>
              <div className="topup-price">$20</div>
              <p className="topup-desc">{ptp.topup2Desc}</p>
            </div>
            <div className="topup-card">
              <h3>{ptp.topup3}</h3>
              <div className="topup-price">$100</div>
              <p className="topup-desc">{ptp.topup3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      <div style={{ textAlign: 'center', paddingBottom: '4rem' }}>
        <Link href={`/${locale}/topup`} className="btn btn-primary">{t.cta.button}</Link>
      </div>
    </div>
  );
}
