'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { getTranslations, Locale } from '@/lib/i18n';

// Mock data for charts (replace with real API later)
const HOURLY_REQUESTS = [12, 8, 5, 3, 2, 1, 0, 2, 15, 28, 35, 42, 38, 30, 25, 22, 18, 15, 20, 32, 40, 35, 20, 10];
const HOURLY_CONSUMPTION = [0.03, 0.02, 0.01, 0.01, 0, 0, 0, 0.01, 0.04, 0.08, 0.12, 0.15, 0.14, 0.10, 0.09, 0.07, 0.06, 0.05, 0.07, 0.11, 0.13, 0.10, 0.05, 0.02];

const CHANNELS = [
  { id: 1, name: '硅基流动 (SiliconFlow)', provider: '硅基流动', models: 40, status: 'active', latency: '180ms' },
  { id: 2, name: 'Token173', provider: 'Token173', models: 579, status: 'active', latency: '220ms' },
  { id: 3, name: '云雾 API (YunWu)', provider: '云雾 API', models: 434, status: 'active', latency: '200ms' },
  { id: 4, name: '文简 (WenJian)', provider: '文简', models: 22, status: 'active', latency: '280ms' },
];

export default function DashboardPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale).dashboard;
  const { data: session, status } = useSession();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [keyLoading, setKeyLoading] = useState(true);

  useEffect(() => { setMounted(true); }, []);

  // Fetch API key from backend proxy when session is ready
  const fetchKey = useCallback(async () => {
    try {
      setKeyLoading(true);
      const resp = await fetch('/api/user/token', { cache: 'no-store' });
      const data = await resp.json();
      if (data.success && data.data?.apiKey) {
        setApiKey(data.data.apiKey);
      }
    } catch {
      // silently fail - user can copy manually
    } finally {
      setKeyLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session) fetchKey();
  }, [session, fetchKey]);

  function copyKey() {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  if (status === 'loading') return <div className="dashboard"><div className="dash-loading"><span className="dash-spinner" /></div></div>;
  if (!session) return <div className="dashboard"><div className="dash-empty"><p>{t.signInPrompt || 'Please sign in first.'}</p><a href={`/${locale}/login`} className="btn btn-primary">{t.signInBtn || 'Sign In →'}</a></div></div>;

  const user = session.user as any;
  const now = new Date();
  const currentHour = now.getHours();
  const maxReq = Math.max(...HOURLY_REQUESTS, 1);
  const maxCons = Math.max(...HOURLY_CONSUMPTION, 0.01);

  if (!mounted) return <div className="dashboard"><div className="dash-loading"><span className="dash-spinner" /></div></div>;

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dash-header">
        <div>
          <h2>{t.title || 'Overview'}</h2>
          <p className="dash-subtitle">
            {t.welcome || 'Welcome back'}, {(user.name || user.email || 'User')} — {now.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="dash-stats-grid">
        <div className="dash-stat-card">
          <div className="dash-stat-icon balance-icon">💳</div>
          <div className="dash-stat-body">
            <div className="dash-stat-label">{t.balance || 'Balance'}</div>
            <div className="dash-stat-value">${((user.balance || 0) / 100).toFixed(2)}</div>
            <div className="dash-stat-sub">{t.availableCredit || 'Available credit'}</div>
          </div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-icon usage-icon">⚡</div>
          <div className="dash-stat-body">
            <div className="dash-stat-label">{t.todaysUsage || "Today's Usage"}</div>
            <div className="dash-stat-value">{(user.todaysTokens || 125000).toLocaleString()}</div>
            <div className="dash-stat-sub">{t.tokens || 'tokens'} · ~$0.42</div>
          </div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-icon month-icon">📊</div>
          <div className="dash-stat-body">
            <div className="dash-stat-label">{t.monthlyUsage || 'Monthly Usage'}</div>
            <div className="dash-stat-value">{(user.monthlyTokens || 2840000).toLocaleString()}</div>
            <div className="dash-stat-sub">{t.tokens || 'tokens'} · ~$8.52</div>
          </div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-icon models-icon">🧠</div>
          <div className="dash-stat-body">
            <div className="dash-stat-label">{t.availableModels || 'Available Models'}</div>
            <div className="dash-stat-value">388</div>
            <div className="dash-stat-sub">{t.acrossChannels || 'across 4 channels'}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dash-section">
        <h3 className="dash-section-title">{t.quickActions || 'Quick Actions'}</h3>
        <div className="dash-actions">
          <Link href={`/${locale}/topup`} className="dash-action-btn dash-action-primary">
            <span className="dash-action-icon">💰</span>
            <span>{t.topUp || 'Top Up'}</span>
          </Link>
          <button onClick={copyKey} className="dash-action-btn">
            <span className="dash-action-icon">🔑</span>
            <span>{copied ? (t.copied || 'Copied!') : (t.copyKey || 'Copy API Key')}</span>
          </button>
          <Link href={`/${locale}/models`} className="dash-action-btn">
            <span className="dash-action-icon">🔍</span>
            <span>{t.viewModels || 'View Models'}</span>
          </Link>
        </div>
      </div>

      {/* API Key */}
      <div className="dash-section">
        <h3 className="dash-section-title">{t.apiKey || 'Your API Key'}</h3>
        <div className="copy-box dash-copy-box">
          {keyLoading ? (
            <code style={{ opacity: 0.5 }}>Loading...</code>
          ) : apiKey ? (
            <code>{apiKey}</code>
          ) : (
            <code style={{ color: 'var(--text-muted)' }}>
              <a href="https://api.aiapisave.xyz/login" target="_blank" rel="noopener noreferrer">
                Sign in to API Console to get your key →
              </a>
            </code>
          )}
          <button onClick={copyKey} className="copy-btn" disabled={!apiKey}>
            {copied ? (t.copied || 'Copied!') : (t.copy || 'Copy')}
          </button>
        </div>
        <div className="dash-endpoint-hint">
          <span>Base URL: <code>https://api.aiapisave.xyz</code></span>
          {apiKey && (
            <a href="https://api.aiapisave.xyz/token" target="_blank" rel="noopener noreferrer" style={{ marginLeft: 12, fontSize: '0.85rem', color: 'var(--accent)' }}>
              Manage Keys →
            </a>
          )}
        </div>
      </div>

      {/* Charts Row */}
      <div className="dash-charts-row">
        {/* 24h Request Volume */}
        <div className="dash-chart-card">
          <h3 className="dash-chart-title">{t.req24h || '24h Request Volume'} <span className="dash-chart-unit">{t.requests || 'requests'}</span></h3>
          <div className="dash-bar-chart">
            {HOURLY_REQUESTS.map((val, i) => (
              <div key={i} className="dash-bar-col">
                <div className="dash-bar-wrapper">
                  <div
                    className={`dash-bar ${i === currentHour ? 'dash-bar-current' : ''}`}
                    style={{ height: `${Math.max((val / maxReq) * 100, val > 0 ? 4 : 0)}%` }}
                    title={`${i}:00 — ${val} ${t.requests || 'reqs'}`}
                  />
                </div>
                <span className={`dash-bar-label ${i === currentHour ? 'dash-bar-label-now' : ''}`}>
                  {i === currentHour ? t.now || 'now' : `${i}h`}
                </span>
              </div>
            ))}
          </div>
          <div className="dash-chart-summary">
            <span>Total: <strong>{HOURLY_REQUESTS.reduce((a, b) => a + b, 0).toLocaleString()}</strong> {t.requests || 'requests'}</span>
            <span>Peak: <strong>{maxReq}</strong> @ {HOURLY_REQUESTS.indexOf(maxReq)}:00</span>
          </div>
        </div>

        {/* 24h Consumption */}
        <div className="dash-chart-card">
          <h3 className="dash-chart-title">{t.cons24h || '24h Consumption'} <span className="dash-chart-unit">$</span></h3>
          <div className="dash-bar-chart">
            {HOURLY_CONSUMPTION.map((val, i) => (
              <div key={i} className="dash-bar-col">
                <div className="dash-bar-wrapper">
                  <div
                    className={`dash-bar dash-bar-cost ${i === currentHour ? 'dash-bar-current' : ''}`}
                    style={{ height: `${Math.max((val / maxCons) * 100, val > 0 ? 4 : 0)}%` }}
                    title={`${i}:00 — $${val.toFixed(3)}`}
                  />
                </div>
                <span className={`dash-bar-label ${i === currentHour ? 'dash-bar-label-now' : ''}`}>
                  {i === currentHour ? t.now || 'now' : `${i}h`}
                </span>
              </div>
            ))}
          </div>
          <div className="dash-chart-summary">
            <span>Total: <strong>${HOURLY_CONSUMPTION.reduce((a, b) => a + b, 0).toFixed(2)}</strong></span>
            <span>Peak: <strong>${maxCons.toFixed(3)}</strong> @ {HOURLY_CONSUMPTION.indexOf(maxCons)}:00</span>
          </div>
        </div>
      </div>

      {/* Active Channels */}
      <div className="dash-section">
        <h3 className="dash-section-title">{t.activeChannels || 'Active Channels'}</h3>
        <div className="dash-channels">
          {CHANNELS.map(ch => (
            <div key={ch.id} className="dash-channel-card">
              <div className="dash-channel-header">
                <div className="dash-channel-name">
                  <span className={`dash-channel-dot ${ch.status}`} />
                  {ch.name}
                </div>
                <span className="dash-channel-count">{ch.models} {t.models || 'models'}</span>
              </div>
              <div className="dash-channel-meta">
                <span>{ch.provider}</span>
                <span className="dash-channel-latency">⚡ {ch.latency}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="dash-section">
        <h3 className="dash-section-title">{t.recentActivity || 'Recent Activity'}</h3>
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>{t.model || 'Model'}</th>
                <th>{t.tokensUsed || 'Tokens'}</th>
                <th>{t.cost || 'Cost'}</th>
                <th>{t.time || 'Time'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="dash-model-tag">gpt-4o-mini</span></td>
                <td>12,400</td>
                <td>$0.003</td>
                <td className="dash-time">{t.justNow || 'Just now'}</td>
              </tr>
              <tr>
                <td><span className="dash-model-tag">claude-sonnet-4-20250514</span></td>
                <td>3,200</td>
                <td>$0.012</td>
                <td className="dash-time">{t.minAgo || '5m ago'}</td>
              </tr>
              <tr>
                <td><span className="dash-model-tag">deepseek-v3</span></td>
                <td>28,000</td>
                <td>$0.005</td>
                <td className="dash-time">{t.minAgo2 || '12m ago'}</td>
              </tr>
              <tr>
                <td><span className="dash-model-tag">gpt-4o</span></td>
                <td>8,500</td>
                <td>$0.021</td>
                <td className="dash-time">{t.minAgo3 || '28m ago'}</td>
              </tr>
              <tr>
                <td><span className="dash-model-tag">gemini-2.5-flash</span></td>
                <td>45,000</td>
                <td>$0.007</td>
                <td className="dash-time">{t.hourAgo || '1h ago'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer links */}
      <div className="dash-footer-links">
        <Link href={`/${locale}/settings`}>{t.viewSettings || 'Settings →'}</Link>
        <Link href={`/${locale}/docs`}>{t.viewDocs || 'API Docs →'}</Link>
      </div>
    </div>
  );
}
