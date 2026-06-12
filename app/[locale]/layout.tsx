import { ReactNode } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { getTranslations, Locale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const title = locale === 'zh'
    ? 'Token Hacker — 一个 API Key 调用所有 AI 模型 | 预付费 · USDT 支付'
    : 'Token Hacker — One API Key for All AI Models | Prepaid · Pay with USDT';

  return {
    title,
    description: locale === 'zh'
      ? '接入 200+ AI 模型 — GPT、Claude、Gemini、DeepSeek。OpenAI 兼容 API，USDT-TRC20 支付，预付费无订阅。60 秒上手。'
      : 'Access 200+ AI models through a single OpenAI-compatible API. Pay with USDT. Prepaid, no subscription. Start in 60 seconds.',
    keywords: 'AI API, GPT, Claude, Gemini, DeepSeek, USDT payment, crypto AI, OpenAI compatible, model aggregator, API proxy',
    openGraph: {
      title,
      description: locale === 'zh'
        ? '一个 API Key 调用所有 AI 模型。预付费 · USDT 支付 · OpenAI 兼容。'
        : 'One API Key for all AI models. Prepaid. Pay with USDT. OpenAI compatible.',
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
