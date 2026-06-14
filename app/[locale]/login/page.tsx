'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { getTranslations, Locale } from '@/lib/i18n';

const oauthProviders = [
  {
    id: 'github',
    name: 'GitHub',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    id: 'google',
    name: 'Google',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    ),
  },
];

export default function LoginPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSignUp = searchParams.get('mode') === 'signup';
  const callbackUrl = searchParams.get('callbackUrl') || `/${locale}/dashboard`;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState('');
  const [error, setError] = useState('');

  // Check for OAuth errors in URL
  const oauthError = searchParams.get('error');

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      action: isSignUp ? 'register' : 'login',
      redirect: false,
    });

    if (result?.error) {
      setError(isSignUp
        ? (locale === 'zh' ? '注册失败，邮箱可能已被使用' : 'Registration failed. Email may already be in use.')
        : (locale === 'zh' ? '邮箱或密码错误' : 'Invalid email or password.'));
    } else if (result?.ok) {
      router.push(callbackUrl);
      router.refresh();
    }
    setLoading(false);
  }

  async function handleOAuth(providerId: string) {
    setLoadingProvider(providerId);
    await signIn(providerId, { callbackUrl });
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isSignUp ? t.login.signUp : t.login.signIn}</h2>
          <p className="auth-subtitle">
            {isSignUp
              ? (locale === 'zh' ? '创建账户，立即获得 $2 免费额度' : 'Create your account and get $2 free credits')
              : (locale === 'zh' ? '登录您的 Token Hacker 账户' : 'Sign in to your Token Hacker account')
            }
          </p>
        </div>

        {/* OAuth error display */}
        {oauthError && (
          <div className="auth-error" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>
              {locale === 'zh' ? '🔴 登录失败' : '🔴 Sign In Failed'}
            </div>
            <div style={{ fontSize: '0.9em', color: 'rgba(239,68,68,0.8)', wordBreak: 'break-word' }}>
              {oauthError}
            </div>
            <div style={{ fontSize: '0.8em', opacity: 0.6, marginTop: 8 }}>
              {locale === 'zh' ? '请尝试其他登录方式，或联系管理员。' : 'Please try another sign-in method or contact admin.'}
            </div>
          </div>
        )}

        {/* International OAuth buttons */}
        <div className="oauth-buttons">
          {oauthProviders.map((p) => (
            <button
              key={p.id}
              className="oauth-btn"
              onClick={() => handleOAuth(p.id)}
              disabled={!!loadingProvider}
            >
              <span className="oauth-icon">{p.icon}</span>
              <span className="oauth-text">
                {loadingProvider === p.id
                  ? (locale === 'zh' ? '连接中...' : 'Connecting...')
                  : isSignUp
                    ? (locale === 'zh' ? `使用 ${p.name} 注册` : `Sign up with ${p.name}`)
                    : (locale === 'zh' ? `使用 ${p.name} 登录` : `Sign in with ${p.name}`)
                }
              </span>
            </button>
          ))}
        </div>

        <div className="divider">
          <span>{locale === 'zh' ? '或使用邮箱' : 'or continue with email'}</span>
        </div>

        {error && (
          <div className="auth-error">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleEmailSubmit} className="auth-form">
          <div className="form-group">
            <label>{t.login.email}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label>{t.login.password}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
            />
          </div>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? '...' : isSignUp ? t.login.signUp : t.login.signIn}
          </button>
        </form>

        <div className="auth-switch">
          {isSignUp ? (
            <>{t.login.hasAccount} <a href={`/${locale}/login`}>{t.login.signInLink}</a></>
          ) : (
            <>{t.login.noAccount} <a href={`/${locale}/login?mode=signup`}>{t.login.signUpLink}</a></>
          )}
        </div>

        {/* Chinese market section */}
        {locale === 'zh' && (
          <>
            <div className="divider" style={{ marginTop: '1.5rem' }}>
              <span>中国用户专属登录方式</span>
            </div>
            <div className="cn-auth-methods">
              <div className="cn-auth-item coming-soon">
                <span className="cn-auth-icon">💬</span>
                <div>
                  <strong>微信扫码登录</strong>
                  <small>即将上线 · 需微信开放平台认证</small>
                </div>
              </div>
              <div className="cn-auth-item coming-soon">
                <span className="cn-auth-icon">📱</span>
                <div>
                  <strong>手机号登录</strong>
                  <small>即将上线 · 支持短信验证码</small>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Payment methods info */}
      <div className="auth-side-info">
        <h3>{locale === 'zh' ? '💳 支持的支付方式' : '💳 Payment Methods'}</h3>
        <div className="payment-methods">
          <div className="payment-method-item">
            <span className="pm-icon">💳</span>
            <div>
              <strong>{locale === 'zh' ? '信用卡' : 'Credit Card'}</strong>
              <small>{locale === 'zh' ? 'Visa / Mastercard / 支持中国银联' : 'Visa / Mastercard / UnionPay'}</small>
            </div>
          </div>
          <div className="payment-method-item">
            <span className="pm-icon">🪙</span>
            <div>
              <strong>USDT (TRC20)</strong>
              <small>{locale === 'zh' ? '即时到账，无手续费' : 'Instant, no fees'}</small>
            </div>
          </div>
          {locale === 'zh' && (
            <>
              <div className="payment-method-item coming-soon">
                <span className="pm-icon">💚</span>
                <div>
                  <strong>微信支付</strong>
                  <small>即将上线</small>
                </div>
              </div>
              <div className="payment-method-item coming-soon">
                <span className="pm-icon">💙</span>
                <div>
                  <strong>支付宝</strong>
                  <small>即将上线</small>
                </div>
              </div>
            </>
          )}
        </div>

        <h3 style={{ marginTop: '1.5rem' }}>🚀 {locale === 'zh' ? '快速开始' : 'Quick Start'}</h3>
        <div className="quick-start-info">
          <div className="qs-step">
            <span className="qs-num">1</span>
            <span>{locale === 'zh' ? '注册即获 $2 免费额度' : 'Sign up → $2 free credits'}</span>
          </div>
          <div className="qs-step">
            <span className="qs-num">2</span>
            <span>{locale === 'zh' ? '用信用卡或 USDT 充值' : 'Top up with card or USDT'}</span>
          </div>
          <div className="qs-step">
            <span className="qs-num">3</span>
            <span>{locale === 'zh' ? '获取 API Key，60 秒开始调用' : 'Get your API key, start in 60s'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
