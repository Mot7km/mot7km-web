'use client';

import { UtensilsCrossed } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { SettingsMenu } from '@/components/common/SettingsMenu';

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <header
      className="relative flex min-h-[32vh] sm:min-h-[42vh] w-full items-end justify-start overflow-hidden rounded-b-[2rem] sm:rounded-b-[2.5rem]"
      style={{ backgroundImage: "url('/download.png')" }}
    >
      {/* Background image layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-700"
        style={{ backgroundImage: "url('/download.png')" }}
      />

      {/* Gradient overlay — animated */}
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background: 'var(--gradient-hero)',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Additional depth overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      {/* Decorative orb — top right */}
      <div className="absolute -top-20 -end-20 w-64 h-64 rounded-full bg-[var(--color-accent)]/10 blur-3xl animate-float pointer-events-none" />

      {/* Decorative orb — bottom left */}
      <div className="absolute -bottom-16 -start-16 w-48 h-48 rounded-full bg-[var(--color-primary)]/15 blur-3xl pointer-events-none" style={{ animationDelay: '2s', animationName: 'float', animationDuration: '5s', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite' }} />

      {/* Settings gear icon */}
      <div className="absolute end-4 top-4 z-20 sm:end-5 sm:top-5 md:end-6 md:top-6">
        <SettingsMenu />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start px-5 pb-6 sm:px-8 sm:pb-8 md:pb-10 lg:pb-12">
        {/* Logo */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 transition-transform duration-300 hover:scale-105">
          <UtensilsCrossed
            strokeWidth={2.2}
            className="h-8 w-8 text-white sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 drop-shadow-lg"
          />
        </div>

        {/* Brand name */}
        <h1
          className="mt-4 text-3xl font-extrabold text-white drop-shadow-xl sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight"
          style={{ fontFamily: 'var(--font-display), var(--font-inter), system-ui, sans-serif' }}
        >
          {t('common.brandName')}
        </h1>

        {/* Tagline */}
        <p className="mt-1.5 max-w-md text-sm font-medium text-white/85 drop-shadow-md sm:mt-3 sm:max-w-lg sm:text-base md:text-lg lg:text-xl">
          {t('header.tagline')}
        </p>

        {/* Decorative gradient line */}
        <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-white/60 via-white/30 to-transparent sm:mt-5 sm:w-24" />
      </div>
    </header>
  );
}