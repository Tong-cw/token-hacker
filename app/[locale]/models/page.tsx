'use client';
import { useState } from 'react';
import Link from 'next/link';
import { getTranslations, Locale } from '@/lib/i18n';

interface Model {
  name: string;
  provider: string;
  capability: string;
  contextWindow: number;
  inputPrice: string;
  outputPrice: string;
  tag: string;
}

const allModels: Model[] = [
  { name: 'GPT-4o', provider: 'OpenAI', capability: 'chat', contextWindow: 128000, inputPrice: '$2.50', outputPrice: '$10.00', tag: '' },
  { name: 'GPT-4o-mini', provider: 'OpenAI', capability: 'chat', contextWindow: 128000, inputPrice: '$0.15', outputPrice: '$0.60', tag: 'best' },
  { name: 'GPT-5.4', provider: 'OpenAI', capability: 'chat', contextWindow: 1050000, inputPrice: '$5.00', outputPrice: '$30.00', tag: '' },
  { name: 'Claude 4.6 Sonnet', provider: 'Anthropic', capability: 'chat', contextWindow: 200000, inputPrice: '$3.00', outputPrice: '$15.00', tag: 'rec' },
  { name: 'Claude 4.6 Haiku', provider: 'Anthropic', capability: 'chat', contextWindow: 200000, inputPrice: '$0.80', outputPrice: '$4.00', tag: 'best' },
  { name: 'Claude Opus 4.7', provider: 'Anthropic', capability: 'reasoning', contextWindow: 200000, inputPrice: '$15.00', outputPrice: '$75.00', tag: '' },
  { name: 'Gemini 3.1 Pro', provider: 'Google', capability: 'chat', contextWindow: 1048576, inputPrice: '$1.25', outputPrice: '$5.00', tag: '' },
  { name: 'Gemini 3.1 Flash', provider: 'Google', capability: 'chat', contextWindow: 1048576, inputPrice: '$0.15', outputPrice: '$0.60', tag: 'best' },
  { name: 'Gemini 3.1 Ultra', provider: 'Google', capability: 'reasoning', contextWindow: 1048576, inputPrice: '$5.00', outputPrice: '$20.00', tag: '' },
  { name: 'DeepSeek V4 Pro', provider: 'DeepSeek', capability: 'reasoning', contextWindow: 128000, inputPrice: '$0.98', outputPrice: '$3.92', tag: '' },
  { name: 'DeepSeek V4 Flash', provider: 'DeepSeek', capability: 'chat', contextWindow: 128000, inputPrice: '$0.14', outputPrice: '$0.56', tag: 'best' },
  { name: 'DeepSeek R1-0528', provider: 'DeepSeek', capability: 'reasoning', contextWindow: 64000, inputPrice: '$0.55', outputPrice: '$2.19', tag: '' },
  { name: 'Llama 4 Maverick', provider: 'Meta', capability: 'chat', contextWindow: 1048576, inputPrice: '$0.20', outputPrice: '$0.60', tag: 'best' },
  { name: 'Grok-4', provider: 'X.AI', capability: 'chat', contextWindow: 1000000, inputPrice: '$2.00', outputPrice: '$8.00', tag: '' },
  { name: 'Grok-4 Mini', provider: 'X.AI', capability: 'chat', contextWindow: 1000000, inputPrice: '$0.20', outputPrice: '$0.80', tag: 'best' },
  { name: 'Qwen 3 Max', provider: 'Qwen', capability: 'reasoning', contextWindow: 128000, inputPrice: '$0.56', outputPrice: '$1.68', tag: '' },
  { name: 'Mistral Large 3', provider: 'Mistral', capability: 'chat', contextWindow: 256000, inputPrice: '$2.00', outputPrice: '$6.00', tag: '' },
  { name: 'Mistral Small 3', provider: 'Mistral', capability: 'chat', contextWindow: 128000, inputPrice: '$0.10', outputPrice: '$0.30', tag: 'best' },
  { name: 'Claude 4.6 Opus', provider: 'Anthropic', capability: 'reasoning', contextWindow: 200000, inputPrice: '$15.00', outputPrice: '$75.00', tag: '' },
  { name: 'GPT-4.1-mini', provider: 'OpenAI', capability: 'chat', contextWindow: 1048576, inputPrice: '$0.30', outputPrice: '$1.20', tag: '' },
];

const providers = ['All', 'OpenAI', 'Anthropic', 'Google', 'DeepSeek', 'Meta', 'X.AI', 'Qwen', 'Mistral'];
const capabilities = ['all', 'chat', 'reasoning', 'vision', 'embedding'];

export default function ModelsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale);
  const [search, setSearch] = useState('');
  const [provider, setProvider] = useState('All');
  const [capability, setCapability] = useState('all');
  const [copied, setCopied] = useState('');

  const filtered = allModels.filter((m) => {
    if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.provider.toLowerCase().includes(search.toLowerCase())) return false;
    if (provider !== 'All' && m.provider !== provider) return false;
    if (capability !== 'all' && m.capability !== capability) return false;
    return true;
  });

  const copyCode = (model: string) => {
    const code = `from openai import OpenAI\n\nclient = OpenAI(\n    base_url="https://api.aiapisave.xyz/v1",\n    api_key="sk-your-key",\n)\n\nresponse = client.chat.completions.create(\n    model="${model}",\n    messages=[{"role": "user", "content": "Hello!"}],\n)`;
    navigator.clipboard.writeText(code);
    setCopied(model);
    setTimeout(() => setCopied(''), 2000);
  };

  const formatContext = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
    return String(n);
  };

  return (
    <div className="models-page">
      <div className="container">
        <div className="page-header">
          <h1>{t.models.title}</h1>
          <p>{t.models.subtitle}</p>
        </div>

        {/* Filters */}
        <div className="models-filters">
          <input
            className="models-search"
            type="text"
            placeholder={t.models.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="models-select" value={provider} onChange={(e) => setProvider(e.target.value)}>
            <option value="All">{t.models.allProviders}</option>
            {providers.filter(p => p !== 'All').map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <select className="models-select" value={capability} onChange={(e) => setCapability(e.target.value)}>
            <option value="all">{t.models.allCapabilities}</option>
            {capabilities.filter(c => c !== 'all').map(c => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Model Cards */}
        <div className="models-result-grid">
          {filtered.map((m) => (
            <div className="model-detail-card" key={m.name}>
              <div className="model-detail-header">
                <div>
                  <span className="model-provider-tag">{m.provider}</span>
                  <h3>{m.name}</h3>
                </div>
                <div className="model-detail-tags">
                  <span className="capability-tag">{m.capability}</span>
                  {m.tag === 'best' && <span className="tag tag-best">{t.models.copied.replace('Copied!', 'Best Value')}</span>}
                  {m.tag === 'rec' && <span className="tag tag-rec">{t.featuredModels.recommended || 'Popular'}</span>}
                </div>
              </div>
              <div className="model-detail-stats">
                <div className="stat">
                  <span className="stat-label">{t.models.context}</span>
                  <span className="stat-value">{formatContext(m.contextWindow)} {t.models.tokens}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">{t.models.inputPrice}</span>
                  <span className="stat-value price">{m.inputPrice}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">{t.models.outputPrice}</span>
                  <span className="stat-value price">{m.outputPrice}</span>
                </div>
              </div>
              <button
                className="copy-code-btn"
                onClick={() => copyCode(m.name)}
              >
                {copied === m.name ? '✅ ' + (copied === m.name ? t.models.copied : '') : t.models.copyCode}
              </button>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '3rem' }}>
            No models found. Try different filters.
          </p>
        )}
      </div>
    </div>
  );
}
