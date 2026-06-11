'use client';
import { useState, useEffect } from 'react';
import { getTranslations, Locale } from '@/lib/i18n';

export default function DashboardPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale).dashboard;
  const [user, setUser] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/auth');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch {}
      setLoading(false);
    }
    load();
  }, []);

  function copyKey() {
    if (user?.apiKey) {
      navigator.clipboard.writeText(user.apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  if (loading) return <div className="dashboard"><p style={{ color: 'var(--text-dim)' }}>Loading...</p></div>;
  if (!user) return <div className="dashboard"><p style={{ color: 'var(--text-dim)' }}>Please sign in first.</p><a href={`/${locale}/login`} style={{ color: 'var(--accent)' }}>Sign In →</a></div>;

  return (
    <div className="dashboard">
      <h2>{t.title}</h2>

      <div className="dash-cards">
        <div className="dash-card" style={{ gridColumn: '1 / -1' }}>
          <h3>{t.apiKey}</h3>
          <div className="copy-box">
            <code>{user.apiKey || 'N/A'}</code>
            <button onClick={copyKey} className="copy-btn">{copied ? t.copied : t.copy}</button>
          </div>
        </div>
        <div className="dash-card">
          <h3>{t.balance}</h3>
          <div className="value accent">${((user.balance || 0) / 100).toFixed(2)}</div>
        </div>
        <div className="dash-card">
          <h3>{t.usage}</h3>
          <div className="value green">{(user.monthlyTokens || 0).toLocaleString()} {t.tokens}</div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <a href={`/${locale}/topup`} className="btn btn-primary">{t.topUp}</a>
      </div>
    </div>
  );
}
