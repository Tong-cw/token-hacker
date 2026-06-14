'use client';
import { useState, useEffect } from 'react';
import { getTranslations, Locale } from '@/lib/i18n';

interface Pricing {
  input: string;
  output: string;
}

interface ModelItem {
  id: string;
  owned_by: string;
  pricing: Pricing | null;
}

function getProvider(id: string, owned_by: string): string {
  // Strip channel prefixes like "Pro/" or "org-name/model-name/" to get the actual model
  const pureId = id.replace(/^(.+\/)+/, '');
  const lower = pureId.toLowerCase();
  if (lower.startsWith('gpt') || lower.startsWith('o1') || lower.startsWith('o3') || lower.startsWith('o4')) return 'OpenAI';
  if (lower.startsWith('claude')) return 'Anthropic';
  if (lower.startsWith('gemini')) return 'Google';
  if (lower.startsWith('deepseek')) return 'DeepSeek';
  if (lower.startsWith('llama')) return 'Meta';
  if (lower.startsWith('grok')) return 'X.AI';
  if (lower.startsWith('qwen') || lower.startsWith('qwq')) return 'Qwen';
  if (lower.startsWith('mistral') || lower.startsWith('codestral') || lower.startsWith('mixtral')) return 'Mistral';
  if (lower.startsWith('glm') || lower.startsWith('chatglm')) return 'Zhipu';
  if (lower.startsWith('doubao')) return 'ByteDance';
  if (lower.startsWith('kimi') || lower.startsWith('moonshot')) return 'Moonshot';
  if (lower.startsWith('yi-') || lower.startsWith('yi ')) return '01.AI';
  if (lower.startsWith('minimax') || lower.startsWith('abab')) return 'MiniMax';
  if (lower.startsWith('hunyuan')) return 'Tencent';
  if (lower.startsWith('ernie') || lower.startsWith('bce-')) return 'Baidu';
  if (lower.startsWith('spark')) return 'iFlytek';
  if (owned_by === 'siliconflow') return 'SiliconFlow';
  if (lower.includes('embed')) return 'Embedding';
  if (lower.includes('tts') || lower.includes('speech') || lower.includes('asr')) return 'Audio';
  if (lower.includes('image') || lower.includes('vidu') || lower.includes('veo') || lower.includes('wan') || lower.includes('suno')) return 'Media';
  if (lower.includes('whisper')) return 'Audio';
  if (lower.includes('rerank') || lower.includes('bge-')) return 'Embedding';
  return owned_by === 'openai' ? 'Other' : owned_by;
}

function getCapability(id: string): string {
  const lower = id.toLowerCase();
  if (lower.includes('tts') || lower.includes('speech') || lower.includes('asr') || lower.includes('whisper')) return 'audio';
  if (lower.includes('embed') || lower.includes('rerank') || lower.includes('bge-')) return 'embedding';
  if (lower.includes('image') || lower.includes('vidu') || lower.includes('veo') || lower.includes('wan') || lower.includes('suno')) return 'media';
  if (lower.includes('vl') || lower.includes('vision') || lower.includes('omni') || lower.includes('ocr')) return 'vision';
  if (lower.includes('think') || lower.includes('reason') || lower.includes('qwq') || lower.startsWith('o1') || lower.startsWith('o3') || lower.startsWith('o4')) return 'reasoning';
  if (lower.includes('coder') || lower.includes('code')) return 'code';
  return 'chat';
}

function getProviderIcon(provider: string): string {
  const icons: Record<string, string> = {
    'OpenAI': '🤖',
    'Anthropic': '🧠',
    'Google': '🔍',
    'Meta': '👁️',
    'DeepSeek': '🐋',
    'X.AI': '🚀',
    'Qwen': '☁️',
    'Mistral': '💨',
    'Zhipu': '📚',
    'Moonshot': '🌙',
    'ByteDance': '🎵',
    '01.AI': '⚡',
    'MiniMax': '🎯',
    'Tencent': '💬',
    'Baidu': '🔵',
    'iFlytek': '🎤',
    'Embedding': '📊',
    'Audio': '🎧',
    'Media': '🎨',
    'SiliconFlow': '🔮',
  };
  return icons[provider] || '📦';
}

const PROVIDER_ORDER: Record<string, number> = {
  'OpenAI': 1,
  'Anthropic': 2,
  'Google': 3,
  'DeepSeek': 4,
  'X.AI': 5,
  'Meta': 6,
  'Qwen': 7,
  'Mistral': 8,
  'Zhipu': 9,
  'Moonshot': 10,
  'ByteDance': 11,
  '01.AI': 12,
  'MiniMax': 13,
  'Tencent': 14,
  'Baidu': 15,
  'iFlytek': 16,
  'Embedding': 17,
  'Audio': 18,
  'Media': 19,
  'SiliconFlow': 20,
};

const PAGE_SIZE = 30;

function copyCode(model: string) {
  const code = `from openai import OpenAI

client = OpenAI(
    base_url="https://api.aiapisave.xyz/v1",
    api_key="sk-your-key",
)

response = client.chat.completions.create(
    model="${model}",
    messages=[{"role": "user", "content": "Hello!"}],
)`;
  navigator.clipboard.writeText(code);
}

export default function ModelsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale);
  const [allModels, setAllModels] = useState<ModelItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [provider, setProvider] = useState('All');
  const [capability, setCapability] = useState('all');
  const [copied, setCopied] = useState('');
  const [selected, setSelected] = useState<ModelItem | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch('/api/models')
      .then(r => r.json())
      .then(data => {
        // Show all models; only display price for properly-configured ones
        setAllModels(data.models || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const providers = ['All', ...Array.from(new Set(allModels.map(m => getProvider(m.id, m.owned_by)))).sort()];
  const capabilities = ['all', 'chat', 'reasoning', 'code', 'vision', 'audio', 'embedding', 'media'];

  const filtered = allModels.filter((m) => {
    const p = getProvider(m.id, m.owned_by);
    const c = getCapability(m.id);
    if (search && !m.id.toLowerCase().includes(search.toLowerCase()) && !p.toLowerCase().includes(search.toLowerCase())) return false;
    if (provider !== 'All' && p !== provider) return false;
    if (capability !== 'all' && c !== capability) return false;
    return true;
  });

  // Use all filtered models — groups handle overflow via Show more button
  const displayed = filtered;

  // Reset page when filters change
  const setFilter = (key: string, val: string) => {
    if (key === 'search') setSearch(val);
    if (key === 'provider') setProvider(val);
    if (key === 'capability') setCapability(val);
    setExpanded(new Set());
  };

  const handleCopy = (model: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    copyCode(model);
    setCopied(model);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleCopyModal = async (model: string) => {
    copyCode(model);
    setCopied(model);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="models-page">
      <div className="container">
        <div className="page-header">
          <h1>{t.models.title}</h1>
          <p>{loading ? t.models.loading : `${allModels.length} ${t.models.available}`}</p>
        </div>

        <div className="models-filters">
          <input
            className="models-search"
            type="text"
            placeholder={t.models.search}
            value={search}
            onChange={(e) => setFilter('search', e.target.value)}
          />
          <select className="models-select" value={provider} onChange={(e) => setFilter('provider', e.target.value)}>
            {providers.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select className="models-select" value={capability} onChange={(e) => setFilter('capability', e.target.value)}>
            <option value="all">{t.models.allCapabilities}</option>
            {capabilities.filter(c => c !== 'all').map(c => (
              <option key={c} value={c}>{(t.models as any)[c] || c}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-dim)' }}>⏳ {t.models.loading}</div>
        ) : (
          <>
            {/* Group by provider, sorted by popularity */}
            {(() => {
              const groups: { provider: string; models: typeof displayed }[] = [];
              const seen = new Map<string, number>();
              displayed.forEach(m => {
                const p = getProvider(m.id, m.owned_by);
                if (seen.has(p)) {
                  groups[seen.get(p)!].models.push(m);
                } else {
                  seen.set(p, groups.length);
                  groups.push({ provider: p, models: [m] });
                }
              });
              // Sort groups by provider popularity
              groups.sort((a, b) => (PROVIDER_ORDER[a.provider] || 99) - (PROVIDER_ORDER[b.provider] || 99));
              return groups.map((group, gi) => {
                const isExpanded = expanded.has(group.provider);
                const visibleModels = isExpanded ? group.models : group.models.slice(0, 3);
                const hiddenCount = group.models.length - 3;
                return (
                <div key={gi} className="provider-group">
                  <h2 className="provider-group-title">
                    <span className="provider-group-icon">{getProviderIcon(group.provider)}</span>
                    {group.provider}
                    <span className="provider-group-count">{group.models.length}</span>
                  </h2>
                  <div className="models-result-grid">
                    {visibleModels.map((m) => {
                      const p = getProvider(m.id, m.owned_by);
                      const c = getCapability(m.id);
                      return (
                        <div className="model-detail-card model-clickable" key={m.id} onClick={() => setSelected(m)}>
                          <div className="model-detail-header">
                            <div style={{ minWidth: 0, flex: 1 }}>
                              <h3 style={{ fontSize: '0.92rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={m.id}>{m.id}</h3>
                            </div>
                            <div className="model-detail-tags">
                              <span className="capability-tag">{c}</span>
                              {m.pricing && m.pricing.input !== '—' && <span className="tag tag-best" style={{ fontSize: '0.65rem' }}>{t.models.priced}</span>}
                            </div>
                          </div>
                          <div className="model-detail-stats" style={{ marginBottom: '0.6rem' }}>
                            <div className="stat">
                              <span className="stat-label">{t.models.detail.input} /1M</span>
                              <span className="stat-value price">{m.pricing?.input}</span>
                            </div>
                            <div className="stat">
                              <span className="stat-label">{t.models.detail.output} /1M</span>
                              <span className="stat-value price">{m.pricing?.output}</span>
                            </div>
                          </div>
                          <button className="copy-code-btn" onClick={(e) => handleCopy(m.id, e)}>
                            {copied === m.id ? `✅ ${t.models.copied}` : t.models.copyCode}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  {hiddenCount > 0 && (
                    <button
                      className="btn-outline show-more-btn"
                      onClick={() => setExpanded(prev => {
                        const next = new Set(prev);
                        if (next.has(group.provider)) next.delete(group.provider);
                        else next.add(group.provider);
                        return next;
                      })}
                    >
                      {isExpanded ? t.models.showLess : `${t.models.showMore} (+${hiddenCount})`}
                    </button>
                  )}
                </div>
              );
              });
            })()}

            {filtered.length === 0 && !loading && (
              <p style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '3rem' }}>{t.models.noResults}</p>
            )}
          </>
        )}

        {selected && <ModelDetail model={selected} t={t.models} onClose={() => setSelected(null)} onCopy={() => handleCopyModal(selected.id)} copied={copied} locale={locale} />}
      </div>
    </div>
  );
}

function ModelDetail({ model, t, onClose, onCopy, copied, locale }: {
  model: ModelItem; t: any; onClose: () => void; onCopy: () => void; copied: string; locale: string;
}) {
  const p = getProvider(model.id, model.owned_by);
  const c = getCapability(model.id);
  const apiBase = 'https://api.aiapisave.xyz';

  const curlExample = `curl ${apiBase}/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-your-key" \\
  -d '{
    "model": "${model.id}",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`;

  const pythonExample = `from openai import OpenAI

client = OpenAI(
    base_url="${apiBase}/v1",
    api_key="sk-your-key",
)

response = client.chat.completions.create(
    model="${model.id}",
    messages=[{"role": "user", "content": "Hello!"}],
)
print(response.choices[0].message.content)`;

  const nodeExample = `import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: '${apiBase}/v1',
  apiKey: 'sk-your-key',
});

const response = await client.chat.completions.create({
  model: '${model.id}',
  messages: [{ role: 'user', content: 'Hello!' }],
});
console.log(response.choices[0].message.content);`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="model-provider-tag">{p}</span>
            <h2>{model.id}</h2>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="detail-section">
            <h3>📋 {t.detail.overview}</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">{t.detail.provider}</span>
                <span className="detail-value">{p}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{t.detail.capability}</span>
                <span className="detail-value" style={{ textTransform: 'capitalize' }}>{c}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{t.detail.apiEndpoint}</span>
                <span className="detail-value mono">{apiBase}/v1</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{t.detail.modelId}</span>
                <span className="detail-value mono">{model.id}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>💰 {t.detail.pricing}</h3>
            <div className="detail-pricing-cards">
              <div className="price-card">
                <span className="price-card-label">{t.detail.input}</span>
                <span className="price-card-value">{model.pricing?.input || '—'}</span>
                <span className="price-card-unit">{t.detail.perMTokens}</span>
              </div>
              <div className="price-card">
                <span className="price-card-label">{t.detail.output}</span>
                <span className="price-card-value">{model.pricing?.output || '—'}</span>
                <span className="price-card-unit">{t.detail.perMTokens}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>💻 {t.detail.apiUsage}</h3>
            <div className="code-tabs">
              <details className="code-block-detail" open={locale === 'zh'}>
                <summary>Python</summary>
                <pre className="modal-code"><code>{pythonExample}</code></pre>
              </details>
              <details className="code-block-detail">
                <summary>cURL</summary>
                <pre className="modal-code"><code>{curlExample}</code></pre>
              </details>
              <details className="code-block-detail" open={locale === 'en'}>
                <summary>Node.js</summary>
                <pre className="modal-code"><code>{nodeExample}</code></pre>
              </details>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={onCopy}>
            {copied === model.id ? `✅ ${t.copied}` : `📋 ${t.copyCode}`}
          </button>
          <button className="btn-outline" onClick={onClose}>{t.detail.close}</button>
        </div>
      </div>
    </div>
  );
}
