'use client';
import Link from 'next/link';
import { getTranslations, Locale } from '@/lib/i18n';

const plans = [
  {
    key: 'free', price: '$0', featured: false, current: true,
    desc: 'For individual developers getting started.',
    features: ['freeMember', 'freeKey', 'freeBalance', 'freeDashboard', 'freeRate'],
  },
  {
    key: 'starter', price: '$19', featured: true,
    desc: 'For small teams shipping AI features.',
    features: ['starterMember', 'starterKey', 'starterBalance', 'starterDashboard', 'starterRate'],
    extras: ['freeMember', 'freeKey', 'freeBalance', 'freeDashboard', 'freeRate'],
  },
  {
    key: 'builder', price: '$79',
    desc: 'For growing teams with higher demands.',
    features: ['builderMember', 'builderKey', 'builderAlert', 'builderRate', 'builderPriority'],
    extras: ['starterMember', 'starterKey', 'starterBalance', 'starterDashboard', 'starterRate'],
  },
  {
    key: 'scale', price: '$299',
    desc: 'For organizations scaling AI across teams.',
    features: ['scaleMember', 'scaleKey', 'scaleRate', 'scaleSSO', 'scaleCustom'],
    extras: ['builderMember', 'builderKey', 'builderAlert', 'builderRate', 'builderPriority'],
  },
];

export default function TeamPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale).team;

  return (
    <div>
      <section className="team-hero">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </section>

      <div className="team-plans">
        {plans.map((plan) => (
          <div key={plan.key} className={`team-plan${plan.featured ? ' featured' : ''}${plan.current ? ' current' : ''}`}>
            {plan.featured && <span className="plan-badge">{t.upgrade}</span>}
            {plan.current && !plan.featured && <span className="plan-badge" style={{ background: 'var(--accent2)' }}>{t.currentPlan}</span>}

            <div className="plan-name">
              {plan.key === 'free' ? t.freePlan :
               plan.key === 'starter' ? t.starterPlan :
               plan.key === 'builder' ? t.builderPlan :
               plan.key === 'scale' ? t.scalePlan : ''}
            </div>
            <div className={`plan-price ${plan.price === '$0' ? 'free' : ''}`}>
              {plan.price}<span className="period">{t.perMonth}</span>
            </div>
            <p className="plan-desc">{plan.desc}</p>

            <ul className="plan-features">
              {plan.key !== 'free' && (
                <li style={{ fontSize: '0.75rem', color: 'var(--text-dim)', padding: '4px 0' }}>
                  {plan.key === 'starter' ? t.starterIncludes :
                   plan.key === 'builder' ? t.builderIncludes :
                   plan.key === 'scale' ? t.scaleIncludes : ''}
                </li>
              )}
              {plan.features.map((f) => (
                <li key={f}>
                  <span className="check">✓</span>
                  {(t as any)[f] || f}
                </li>
              ))}
            </ul>

            {plan.key === 'scale' ? (
              <Link href={`/${locale}/contact`} className="plan-btn outline">{t.contactSales}</Link>
            ) : plan.current ? (
              <Link href={`/${locale}/dashboard`} className="plan-btn outline">{t.currentPlan}</Link>
            ) : (
              <Link href={`/${locale}/topup`} className="plan-btn primary">{t.upgrade}</Link>
            )}
          </div>
        ))}
      </div>

      {/* Enterprise row */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem 4rem' }}>
        <div className="team-plan featured" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2rem', padding: '2rem' }}>
          <div style={{ flex: 1 }}>
            <div className="plan-name">{t.enterprisePlan}</div>
            <p className="plan-desc" style={{ marginBottom: 0 }}>
              {t.enterpriseMember} · {t.enterpriseKey} · {t.enterpriseDedicated} · {t.enterpriseSLA}
            </p>
          </div>
          <Link href={`/${locale}/contact`} className="plan-btn primary" style={{ whiteSpace: 'nowrap' }}>
            {t.contactSales}
          </Link>
        </div>
      </div>
    </div>
  );
}
