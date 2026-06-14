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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
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

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileNavOpen]);

  const navLinks = [
    { href: `/${locale}/models`, label: t.models },
    { href: `/${locale}/pricing`, label: t.pricing },
    { href: `/${locale}/docs`, label: t.docs },
    { href: `/${locale}/blog`, label: t.blog },
  ];

  return (
    <nav>
      <div className="nav-inner">
        <div className="nav-left">
          <Link href={`/${locale}`} className="logo" onClick={() => setMobileNavOpen(false)}>
            <span className="logo-icon">⚡</span>Token Hacker
          </Link>
          <ul className="nav-links">
            {navLinks.map(link => (
              <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
            ))}
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
                    {String.fromCodePoint(0x1F4CA)} {t.dashboard}
                  </Link>
                  <Link href={`/${locale}/settings`} className="dropdown-item">
                    {String.fromCodePoint(0x2699, 0xFE0F)} {t.settings}
                  </Link>
                  <div className="dropdown-divider" />
                  <button onClick={() => signOut()} className="dropdown-item dropdown-logout">
                    {String.fromCodePoint(0x1F69A)} {t.logout}
                  </button>
                </div>
              )}
            </div>
          ) : status === 'loading' ? (
            <div className="nav-skeleton" />
          ) : (
            <Link href={`/${locale}/login`} className="btn-nav">{t.login}</Link>
          )}
          <ThemeToggle />
          <Link href={otherPath} className="lang-toggle">
            {otherLocale === 'zh' ? '中文' : 'EN'}
          </Link>
          {/* Mobile hamburger */}
          <button
            className="hamburger"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle menu"
          >
            <span className={mobileNavOpen ? 'hamburger-line open' : 'hamburger-line'} />
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div className={`mobile-nav ${mobileNavOpen ? 'mobile-nav-open' : ''}`}>
        <div className="mobile-nav-links">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setMobileNavOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mobile-nav-footer">
          {status === 'authenticated' ? (
            <>
              <Link href={`/${locale}/dashboard`} className="mobile-nav-link" onClick={() => setMobileNavOpen(false)}>
                {String.fromCodePoint(0x1F4CA)} {t.dashboard}
              </Link>
              <Link href={`/${locale}/settings`} className="mobile-nav-link" onClick={() => setMobileNavOpen(false)}>
                {String.fromCodePoint(0x2699, 0xFE0F)} {t.settings}
              </Link>
              <button onClick={() => { signOut(); setMobileNavOpen(false); }} className="mobile-nav-link mobile-logout">
                {String.fromCodePoint(0x1F69A)} {t.logout}
              </button>
            </>
          ) : (
            <Link href={`/${locale}/login`} className="btn-primary mobile-cta" onClick={() => setMobileNavOpen(false)}>
              {t.login}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
