import { ReactNode } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { getTranslations, Locale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale);
  const title = locale === 'zh'
    ? 'Token Hacker — AI API 价格对比 | 每年省 80%'
    : 'Token Hacker — AI API Price Comparison | Save 80%';

  return {
    title,
    description: locale === 'zh'
      ? 'AI API 价格对比，帮你每年省 80% Token 开销。DeepSeek、GPT、Claude、Gemini 实时比价，免费省钱计算器。'
      : 'Compare AI API prices. Save 80% on token costs. DeepSeek, GPT, Claude, Gemini real-time comparison. Free savings calculator.',
    keywords: 'AI API, DeepSeek, GPT, Claude, price comparison, API proxy, token calculator, save money',
    openGraph: {
      title,
      description: locale === 'zh'
        ? '帮你每年省 80% Token 开销，免费省钱计算器。'
        : 'Save 80% on AI API costs. Free savings calculator.',
      type: 'website',
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <>
      <Nav locale={params.locale as Locale} />
      <main>{children}</main>
      <Footer locale={params.locale as Locale} />
    </>
  );
}
