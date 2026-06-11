'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTranslations, Locale } from '@/lib/i18n';

export default function LoginPage({ params, searchParams }: {
  params: { locale: string };
  searchParams: { mode?: string };
}) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale).login;
  const router = useRouter();
  const isSignUp = searchParams.mode === 'signup';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, action: isSignUp ? 'register' : 'login' }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');

      // Store token in cookie via API
      document.cookie = `token=${data.token}; path=/; max-age=2592000; SameSite=Lax`;
      router.push(`/${locale}/dashboard`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{isSignUp ? t.signUp : t.signIn}</h2>
        <p className="subtitle">{t.subtitle}</p>
        {error && <p style={{ color: 'var(--red)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t.email}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>{t.password}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? '...' : isSignUp ? t.signUp : t.signIn}
          </button>
        </form>
        <div className="auth-switch">
          {isSignUp ? (
            <>{t.hasAccount} <a href={`/${locale}/login`}>{t.signInLink}</a></>
          ) : (
            <>{t.noAccount} <a href={`/${locale}/login?mode=signup`}>{t.signUpLink}</a></>
          )}
        </div>
      </div>
    </div>
  );
}
