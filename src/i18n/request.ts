import { getRequestConfig } from 'next-intl/server';
import { Locale, i18n } from '@/config/i18n';

export default getRequestConfig(async ({ locale }) => {
  const validLocale = (locale && i18n.locales.includes(locale as Locale))
    ? locale
    : i18n.defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}/common.json`)).default,
  };
});