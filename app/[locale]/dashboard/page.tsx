'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { getTranslations, Locale } from '@/lib/i18n';

interface DashboardData {
  user: { username: string; email: string; balance: number; used_quota: number; request_count: number };
  stats: { today_tokens: number; today_quota: number; month_tokens: number; month_quota: number; total_requests: number };
  hourly: { requests: number[]; quota: number[] };
  channels: Array<{ id: number; name: string; provider: string; models: number; status: string; used_quota: number }>;
  recent_logs: Array<{ model: string; tokens: number; quota: number; time: number; channel_id: number }>;
}

export default function DashboardPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale).dashboard;
  const { data: session, status } = useSession();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [keyLoading, setKeyLoading] = useState(true);
  const [dashData, setDashData] = useState<DashboardData | null>(null);
  const [dashLoading, setDashLoading] = useState(true);

  useEffect(() => { setMounted(true); }, []);

  // Fetch API key from backend proxy
  const fetchKey = useCallback(async () => {
    try {
      setKeyLoading(true);
      const resp = await fetch('/api/token', { cache: 'no-store' });
      const data = await resp.json();
      if (data.success && data.data?.apiKey) setApiKey(data.data.apiKey);
    } catch { /* silent */ }
    finally { setKeyLoading(false); }
  }, []);

  // Fetch dashboard stats from New-API
  const fetchDashboard = useCallback(async () => {
    try {
      const resp = await fetch('/api/dashboard', { cache: 'no-store' });
      const data = await resp.json();
      if (data.success) setDashData(data.data);
    } catch { /* silent */ }
    finally { setDashLoading(false); }
  }, []);

  useEffect(() => {
    if (session) { fetchKey(); fetchDashboard(); }
  }, [session, fetchKey, fetchDashboard]);

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

  const hourlyRequests: number[] = dashData?.hourly?.requests || new Array(24).fill(0);
  const hourlyConsumption: number[] = dashData?.hourly?.quota?.map((q: number) => q / 500000) || new Array(24).fill(0);
  const channels = dashData?.channels || [];
  const recentLogs = dashData?.recent_logs || [];
  const stats = dashData?.stats;
  const balance = dashData?.user?.balance;
  const maxReq = Math.max(...hourlyRequests, 1);
  const maxCons = Math.max(...hourlyConsumption, 0.01);

  if (!mounted) return <div className="dashboard"><div className="dash-loading"><span className="dash-spinner" /></div></div>;

  const formatTimeAgo = (ts: number) => {
    const mins = Math.floor((Date.now() / 1000 - ts) / 60);
    if (mins < 1) return t.justNow || 'Just now';
    if (mins < 60) return `${mins}${t.minAgoUnit || 'm ago'}`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}${t.hourAgoUnit || 'h ago'}`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

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
            <div className="dash-stat-value">{dashLoading ? '…' : `$${(balance != null ? (balance / 500000) : 0).toFixed(2)}`}</div>
            <div className="dash-stat-sub">{t.availableCredit || 'Available credit'}</div>
          </div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-icon usage-icon">⚡</div>
          <div className="dash-stat-body">
            <div className="dash-stat-label">{t.todaysUsage || "Today's Usage"}</div>
            <div className="dash-stat-value">{dashLoading ? '…' : (stats?.today_tokens || 0).toLocaleString()}</div>
            <div className="dash-stat-sub">{t.tokens || 'tokens'} · ~${((stats?.today_quota || 0) / 500000).toFixed(2)}</div>
          </div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-icon month-icon">📊</div>
          <div className="dash-stat-body">
            <div className="dash-stat-label">{t.monthlyUsage || 'Monthly Usage'}</div>
            <div className="dash-stat-value">{dashLoading ? '…' : (stats?.month_tokens || 0).toLocaleString()}</div>
            <div className="dash-stat-sub">{t.tokens || 'tokens'} · ~${((stats?.month_quota || 0) / 500000).toFixed(2)}</div>
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
            {hourlyRequests.map((val: number, i: number) => (
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
            <span>Total: <strong>{hourlyRequests.reduce((a: number, b: number) => a + b, 0).toLocaleString()}</strong> {t.requests || 'requests'}</span>
            <span>Peak: <strong>{maxReq}</strong> @ {hourlyRequests.indexOf(maxReq)}:00</span>
          </div>
        </div>

        {/* 24h Consumption */}
        <div className="dash-chart-card">
          <h3 className="dash-chart-title">{t.cons24h || '24h Consumption'} <span className="dash-chart-unit">$</span></h3>
          <div className="dash-bar-chart">
            {hourlyConsumption.map((val: number, i: number) => (
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
            <span>Total: <strong>${hourlyConsumption.reduce((a: number, b: number) => a + b, 0).toFixed(2)}</strong></span>
            <span>Peak: <strong>${maxCons.toFixed(3)}</strong> @ {hourlyConsumption.indexOf(maxCons)}:00</span>
          </div>
        </div>
      </div>

      {/* Active Channels */}
      <div className="dash-section">
        <h3 className="dash-section-title">{t.activeChannels || 'Active Channels'}</h3>
        <div className="dash-channels">
          {channels.map((ch) => (
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
                <span className="dash-channel-latency">📊 {(ch.used_quota || 0).toLocaleString()} quota</span>
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
              {recentLogs.length === 0 && !dashLoading ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>{t.noActivity || 'No recent activity'}</td></tr>
              ) : recentLogs.map((log, i) => (
                <tr key={i}>
                  <td><span className="dash-model-tag">{log.model}</span></td>
                  <td>{log.tokens.toLocaleString()}</td>
                  <td>${(log.quota / 500000).toFixed(4)}</td>
                  <td className="dash-time">{formatTimeAgo(log.time)}</td>
                </tr>
              ))}
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
