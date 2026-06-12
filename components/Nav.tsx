'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getTranslations, Locale } from '@/lib/i18n';

export default function Nav({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).nav;
  const pathname = usePathname();
  const otherLocale: Locale = locale === 'en' ? 'zh' : 'en';
  const otherPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <nav>
      <div className="nav-inner">
        <div className="nav-left">
          <Link href={`/${locale}`} className="logo">
            <span className="logo-icon">⚡</span>Token Hacker
          </Link>
          <ul className="nav-links">
            <li><Link href={`/${locale}/models`}>{t.models}</Link></li>
            <li><Link href={`/${locale}/pricing`}>{t.pricing}</Link></li>
            <li><Link href={`/${locale}/docs`}>{t.docs}</Link></li>
            <li><Link href={`/${locale}/blog`}>{t.blog}</Link></li>
          </ul>
        </div>
        <div className="nav-right">
          <Link href={`/${locale}/login`} className="btn-nav">{t.login}</Link>
          <Link href={otherPath} className="lang-toggle">
            {otherLocale === 'zh' ? '中文' : 'EN'}
          </Link>
        </div>
      </div>
    </nav>
  );
}
