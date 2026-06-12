'use client';
import { useState } from 'react';
import Link from 'next/link';
import { getTranslations, Locale } from '@/lib/i18n';

export default function SettingsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale).settings;

  const [balanceAlert, setBalanceAlert] = useState(true);
  const [threshold, setThreshold] = useState('5');
  const [alertEmail, setAlertEmail] = useState('dev@example.com');
  const [dailyLimit, setDailyLimit] = useState('1000000');
  const [monthlyLimit, setMonthlyLimit] = useState('10000000');
  const [toast, setToast] = useState('');

  const rateLimits = [
    { label: t.rpmFull, value: '60', used: '24', pct: 40 },
    { label: t.tpmFull, value: '90,000', used: '42,000', pct: 47 },
    { label: t.concurrency, value: '10', used: '3', pct: 30 },
  ];

  function handleSave() {
    setToast(t.saved);
    setTimeout(() => setToast(''), 3000);
  }

  return (
    <div className="settings-page">
      <h2>{t.title}</h2>
      <p>{t.subtitle}</p>

      {/* Rate Limits */}
      <div className="settings-section">
        <h3>{t.rateLimits}</h3>
        <p>{t.rateLimitsDesc}</p>
        <div className="settings-grid">
          {rateLimits.map(r => (
            <div className="rate-card" key={r.label}>
              <div className="rate-label">{r.label}</div>
              <div className="rate-value">{r.value}</div>
              <div className="rate-used">{t.used}: {r.used}</div>
              <div className="rate-bar">
                <div className={`fill${r.pct > 70 ? ' high' : r.pct > 40 ? ' mid' : ' low'}`}
                     style={{ width: `${r.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '8px 18px' }}>
          {t.requestIncrease}
        </button>
      </div>

      {/* Balance Alerts */}
      <div className="settings-section">
        <h3>{t.balanceAlerts}</h3>
        <p>{t.balanceAlertsDesc}</p>

        <div className="toggle-row" style={{ marginBottom: '1rem' }}>
          <button
            className={`toggle-switch${balanceAlert ? ' on' : ''}`}
            onClick={() => setBalanceAlert(!balanceAlert)}
            aria-label={t.enableAlerts}
          />
          <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{t.enableAlerts}</span>
        </div>

        {balanceAlert && (
          <>
            <div className="form-row">
              <label>{t.alertThreshold}</label>
              <input type="number" value={threshold} onChange={e => setThreshold(e.target.value)} min="1" />
              <span className="unit">USD</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '-0.3rem', marginBottom: '1rem' }}>
              {t.thresholdHelp}
            </p>
            <div className="form-row">
              <label>{t.emailForAlerts}</label>
              <input type="email" value={alertEmail} onChange={e => setAlertEmail(e.target.value)} />
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '-0.3rem', marginBottom: '0' }}>
              {t.emailHelp}
            </p>
          </>
        )}
      </div>

      {/* Usage Alerts */}
      <div className="settings-section">
        <h3>{t.usageAlerts}</h3>
        <p>{t.usageAlertsDesc}</p>

        <div className="form-row">
          <label>{t.dailyAlert}</label>
          <input type="number" value={dailyLimit} onChange={e => setDailyLimit(e.target.value)} />
          <span className="unit">tokens</span>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '-0.3rem', marginBottom: '1rem' }}>
          {t.dailyAlertHelp}
        </p>

        <div className="form-row">
          <label>{t.monthlyAlert}</label>
          <input type="number" value={monthlyLimit} onChange={e => setMonthlyLimit(e.target.value)} />
          <span className="unit">tokens</span>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '-0.3rem', marginBottom: '0' }}>
          {t.monthlyAlertHelp}
        </p>
      </div>

      <button className="btn-save" onClick={handleSave}>{t.saveSettings}</button>

      {/* Quick links */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        <div className="settings-section" style={{ flex: 1, minWidth: '260px' }}>
          <h3>{t.teamSettings}</h3>
          <p>{t.teamSettingsDesc}</p>
          <Link href={`/${locale}/team/manage`} className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '8px 18px', textDecoration: 'none' }}>
            {t.manageTeam}
          </Link>
        </div>
        <div className="settings-section" style={{ flex: 1, minWidth: '260px' }}>
          <h3>{t.apiKeySettings}</h3>
          <p>{t.apiKeySettingsDesc}</p>
          <Link href={`/${locale}/dashboard`} className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '8px 18px', textDecoration: 'none' }}>
            Dashboard →
          </Link>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
