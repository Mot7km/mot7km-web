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
    router.refresh(); // forces Next.js to drop the cached RSC payload for the shared [locale] layout and re-render Header/Footer/page with the new locale
  };

  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = segments[0] && i18n.locales.includes(segments[0] as (typeof i18n.locales)[number])
    ? segments[0]
    : locale;

  return (
    <div className="flex items-center gap-0.5 p-1 rounded-full glass-subtle">
      {i18n.locales.map((loc) => {
        const isActive = currentLocale === loc;
        const label = loc === 'en' ? t('languages.en') : t('languages.ar');
        return (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            className={`
              relative flex items-center justify-center
              min-w-8 h-8 px-2.5 rounded-full
              text-xs font-semibold
              transition-all duration-250 ease-out
              hover:scale-105 active:scale-95
              cursor-pointer
              ${
                isActive
                  ? 'text-[var(--color-text-on-primary)] shadow-md'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-white/20 dark:hover:bg-white/10'
              }
            `}
            style={isActive ? { background: 'var(--gradient-primary)' } : undefined}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}