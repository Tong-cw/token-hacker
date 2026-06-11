'use client';
import { useState } from 'react';
import { getTranslations, Locale } from '@/lib/i18n';

const amounts = [5, 10, 20, 50, 100];

export default function TopUpPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale).payment;
  const [amount, setAmount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handlePay() {
    setLoading(true);
    setError('');
    try {
      const token = document.cookie.match(/token=([^;]+)/)?.[1];
      const res = await fetch('/api/payment/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount: amount * 100 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Payment failed');
      if (data.url) window.location.href = data.url;
      else setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (success) return (
    <div className="dashboard">
      <h2>✅ {t.success}</h2>
      <p style={{ color: 'var(--text-dim)', marginTop: '1rem' }}>Redirecting to dashboard...</p>
      <script dangerouslySetInnerHTML={{ __html: `setTimeout(() => window.location.href='/${locale}/dashboard', 2000)` }} />
    </div>
  );

  return (
    <div className="dashboard">
      <h2>{t.title}</h2>
      <div className="payment-card">
        <h3>{t.title}</h3>
        {error && <p style={{ color: 'var(--red)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
        <div className="preset-amounts">
          {amounts.map((a) => (
            <div key={a} className={`preset-amt ${amount === a ? 'active' : ''}`} onClick={() => setAmount(a)}>
              ${a}
            </div>
          ))}
        </div>
        <button onClick={handlePay} className="btn-submit" disabled={loading}>
          {loading ? t.processing : `${t.pay} — $${amount}`}
        </button>
      </div>
    </div>
  );
}
