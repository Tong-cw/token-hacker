'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { getTranslations, Locale } from '@/lib/i18n';

export default function DashboardPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale).dashboard;
  const st = getTranslations(locale).settings;
  const { data: session, status } = useSession();
  const [copied, setCopied] = useState(false);

  function copyKey() {
    const apiKey = (session?.user as any)?.apiKey;
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  if (status === 'loading') return <div className="dashboard"><p style={{ color: 'var(--text-dim)' }}>Loading...</p></div>;
  if (!session) return <div className="dashboard"><p style={{ color: 'var(--text-dim)' }}>Please sign in first.</p><a href={`/${locale}/login`} style={{ color: 'var(--accent)' }}>Sign In →</a></div>;

  const user = session.user as any;
  const members = [
    { name: 'alice@example.com', role: 'Owner', since: 'Jun 2026', quota: '1.2M', rpm: '60', tpm: '90000' },
    { name: 'bob@devteam.io', role: 'Admin', since: 'Jun 2026', quota: '840K', rpm: '60', tpm: '90000' },
    { name: 'carol@startup.co', role: 'Member', since: 'Jun 2026', quota: '320K', rpm: '30', tpm: '45000' },
  ];

  return (
    <div className="dashboard">
      <h2>{t.title}</h2>

      {/* Main cards */}
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
        <div className="dash-card">
          <h3>{t.rateLimit}</h3>
          <div style={{ display: 'flex', gap: '1.2rem', marginTop: '0.3rem' }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{t.rpm}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '1.05rem', color: 'var(--accent)' }}>60</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{t.tpm}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '1.05rem', color: 'var(--accent)' }}>90K</div>
            </div>
          </div>
        </div>
        <div className="dash-card">
          <h3>{t.alertsEnabled}</h3>
          <div style={{ marginTop: '0.3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent2)', display: 'inline-block' }} />
              <span style={{ fontSize: '0.85rem' }}>Balance {'<'} $5</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent3)', display: 'inline-block' }} />
              <span style={{ fontSize: '0.85rem' }}>Daily {'>'} 1M tokens</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
        <Link href={`/${locale}/topup`} className="btn btn-primary">{t.topUp}</Link>
        <Link href={`/${locale}/settings`} className="btn btn-outline" style={{ textDecoration: 'none', padding: '14px 24px' }}>
          {t.viewSettings}
        </Link>
      </div>

      {/* Team members section */}
      <section style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.15rem' }}>{t.teamView}</h3>
          <Link href={`/${locale}/team/manage`} style={{ color: 'var(--accent)', fontSize: '0.85rem', textDecoration: 'none' }}>
            {st.manageTeam}
          </Link>
        </div>
        <div className="dash-cards">
          {members.map((m, i) => (
            <div className="dash-card" key={i} style={{ padding: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--accent)' }}>{m.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    <span className={`member-role ${m.role.toLowerCase()}`}>{m.role}</span>
                    <span style={{ marginLeft: '0.5rem' }}>{t.memberSince}: {m.since}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.82rem' }}>
                <div>
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>{t.quotaUsed}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{m.quota}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>{t.rpm}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{m.rpm}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>{t.tpm}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{m.tpm}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
