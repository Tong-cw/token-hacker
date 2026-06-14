'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';
import { getTranslations, Locale } from '@/lib/i18n';
import ThemeToggle from '@/components/ThemeToggle';

export default function Nav({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).nav;
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const otherLocale: Locale = locale === 'en' ? 'zh' : 'en';
  const otherPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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
          {status === 'authenticated' ? (
            <div className="user-menu" ref={menuRef}>
              <button className="btn-user" onClick={() => setMenuOpen(!menuOpen)}>
                <span className="user-avatar">
                  {session?.user?.name?.[0]?.toUpperCase() || 'U'}
                </span>
                <span className="user-name">{session?.user?.name || session?.user?.email}</span>
                <span className="menu-arrow">▾</span>
              </button>
              {menuOpen && (
                <div className="dropdown-menu">
                  <Link href={`/${locale}/dashboard`} className="dropdown-item">
                    📊 {t.dashboard}
                  </Link>
                  <Link href={`/${locale}/settings`} className="dropdown-item">
                    ⚙️ {t.settings}
                  </Link>
                  <div className="dropdown-divider" />
                  <button onClick={() => signOut()} className="dropdown-item dropdown-logout">
                    🚪 {t.logout}
                  </button>
                </div>
              )}
            </div>
          ) : status === 'loading' ? (
            <div className="nav-skeleton" />
          ) : (
            <>
              <Link href={`/${locale}/login`} className="btn-nav">{t.login}</Link>
            </>
          )}
          <ThemeToggle />
          <Link href={otherPath} className="lang-toggle">
            {otherLocale === 'zh' ? '中文' : 'EN'}
          </Link>
        </div>
      </div>
    </nav>
  );
}
