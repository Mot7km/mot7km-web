import { getRequestConfig } from 'next-intl/server';
import { Locale, i18n } from '@/config/i18n';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const validLocale = (requested && i18n.locales.includes(requested as Locale))
    ? requested
    : i18n.defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}/common.json`)).default,
  };
});