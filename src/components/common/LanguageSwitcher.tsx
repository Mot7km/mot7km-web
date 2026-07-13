'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { i18n } from '@/config/i18n';

export function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const getLocalizedPath = (newLocale: string) => {
    const segments = pathname.split('/').filter(Boolean);
    const hasLocalePrefix = segments[0] && i18n.locales.includes(segments[0] as (typeof i18n.locales)[number]);

    if (hasLocalePrefix) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    return `/${segments.join('/')}`;
  };

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;

    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax; Secure`;
    router.push(getLocalizedPath(newLocale));
    router.refresh(); // <-- forces Next.js to drop the cached RSC payload for the shared [locale] layout and re-render Header/Footer/page with the new locale
  };

  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = segments[0] && i18n.locales.includes(segments[0] as (typeof i18n.locales)[number])
    ? segments[0]
    : locale;

  return (
    <div className="flex items-center gap-1 p-1 bg-[var(--color-surface)] rounded-full border border-[var(--color-border)] shadow-sm">
      {i18n.locales.map((loc) => {
        const isActive = currentLocale === loc;
        const label = loc === 'en' ? t('languages.en') : t('languages.ar');
        return (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            className={`
              relative flex items-center justify-center
              min-w-9 h-9 px-3 rounded-full
              text-sm font-medium
              transition-all duration-200 ease-out
              hover:scale-105 active:scale-95
              ${
                isActive
                  ? 'bg-[var(--color-primary)] text-[var(--color-text-on-primary)] shadow-[var(--color-primary)]/30'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border)]'
              }
            `}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}