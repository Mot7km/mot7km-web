import { UtensilsCrossed } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { ThemeSwitcher } from '@/components/common/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar'; // adjust if your Arabic locale code differs

  return (
    <header
      className="relative flex min-h-[30vh] sm:min-h-[40vh] w-full items-end justify-start px-4 py-4 sm:px-5 sm:py-5 bg-cover bg-center bg-no-repeat rounded-b-4xl overflow-hidden"
      style={{ backgroundImage: "url('/download.png')" }}
    >
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />

      {/* Switcher – now uses logical `end-3` and `top-3` */}
      <div className="absolute end-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-[var(--color-text-on-primary)]/10 px-2 py-1.5 backdrop-blur-md sm:end-4 sm:top-4 sm:gap-2 sm:px-3 sm:py-2 md:end-6 md:top-6 md:gap-3">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>

      <div className="relative z-10 flex flex-col items-start px-3 text-start sm:px-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[var(--color-text-on-primary)]/30 bg-[var(--color-text-on-primary)]/10 backdrop-blur-sm shadow-2xl sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32">
          <UtensilsCrossed
            strokeWidth={2.5}
            className="h-8 w-8 text-[var(--color-text-on-primary)] sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16"
          />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-[var(--color-text-on-primary)] drop-shadow-lg sm:mt-6 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          {t('common.brandName')}
        </h1>
        <p className="mt-1 text-sm font-medium text-[var(--color-text-on-primary)]/90 drop-shadow-md sm:mt-4 sm:text-base md:text-lg lg:text-xl">
          {t('header.tagline')}
        </p>
      </div>
    </header>
  );
}