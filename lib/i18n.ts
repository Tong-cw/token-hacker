import translations from './translations';

export type Locale = 'en' | 'zh';
export type TranslationKey = keyof typeof translations.en;

export function getTranslations(locale: Locale) {
  return translations[locale] || translations.en;
}

export function getDict<K extends TranslationKey>(locale: Locale, key: K) {
  const t = getTranslations(locale);
  return t[key];
}
