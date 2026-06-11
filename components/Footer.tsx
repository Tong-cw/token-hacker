import { getTranslations, Locale } from '@/lib/i18n';

export default function Footer({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).footer;

  return (
    <footer>
      <p>{t.copyright}</p>
      <p>{t.built}</p>
    </footer>
  );
}
