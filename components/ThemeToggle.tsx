'use client';
import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light' | 'system';

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme: Theme) {
  if (theme === 'system') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  try {
    const v = localStorage.getItem('theme');
    if (v === 'light' || v === 'dark' || v === 'system') return v;
  } catch {}
  return 'dark';
}

const themeIcons: Record<Theme, string> = {
  dark: '🌙',
  light: '☀️',
  system: '💻',
};

const themeLabels: Record<Theme, string> = {
  dark: 'Dark',
  light: 'Light',
  system: 'Auto',
};

const themeOrder: Theme[] = ['dark', 'light', 'system'];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredTheme();
    setTheme(stored);
    applyTheme(stored);

    // Listen for system changes when in system mode
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const handler = () => {
      if (getStoredTheme() === 'system') {
        applyTheme('system'); // force re-evaluation
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  function cycle() {
    const idx = themeOrder.indexOf(theme);
    const next = themeOrder[(idx + 1) % themeOrder.length];
    setTheme(next);
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch {}
  }

  // Prevent hydration mismatch - always render the button, just invisible until mounted
  return (
    <button
      onClick={cycle}
      className="theme-toggle"
      title={`Theme: ${themeLabels[theme]}${!mounted ? ' (loading)' : ''}`}
      aria-label="Toggle theme"
    >
      {mounted ? themeIcons[theme] : '🌙'}
    </button>
  );
}
