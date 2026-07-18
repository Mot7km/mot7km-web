'use client';

import { UtensilsCrossed, Zap, Star, Shield, Headphones } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { SettingsMenu } from '@/components/common/SettingsMenu';

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const trustBadges = [
    { icon: Zap, label: t('trustBadges.fastDelivery'), color: 'var(--color-warning)' },
    { icon: Star, label: t('trustBadges.premiumQuality'), color: 'var(--color-accent)' },
    { icon: Shield, label: t('trustBadges.securePayment'), color: 'var(--color-success)' },
    { icon: Headphones, label: t('trustBadges.support'), color: 'var(--color-primary-light)' },
  ];

  return (
    <header
      className="relative flex min-h-[38vh] sm:min-h-[46vh] w-full items-end justify-start rounded-b-[2rem] sm:rounded-b-[2.5rem] overflow-hidden"
      style={{
        background: 'var(--gradient-hero)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 8s ease-in-out infinite alternate',
      }}
    >
      {/* ── Decorative layers ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Depth overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20" />

        {/* Floating orbs (like landing page) */}
        <div
          className="absolute -top-20 -end-20 w-72 h-72 rounded-full bg-[var(--color-accent)]/20 opacity-60 animate-orb-1"
        />
        <div
          className="absolute -bottom-16 -start-16 w-56 h-56 rounded-full bg-[var(--color-primary)]/25 opacity-50 animate-orb-2"
        />
        <div
          className="absolute top-1/2 start-1/3 w-40 h-40 rounded-full bg-[var(--color-secondary)]/15 opacity-40 animate-breathe"
        />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")' }}
        />

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/15 to-transparent" />
      </div>

      {/* ── Settings gear ── */}
      <div className="absolute end-4 top-4 z-20 sm:end-5 sm:top-5 md:end-6 md:top-6">
        <SettingsMenu />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-start px-5 pb-6 sm:px-8 sm:pb-8 md:pb-10 lg:pb-12 w-full">
        {/* Logo */}
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl
            border border-white/30 bg-white/15 backdrop-blur-md
            shadow-[0_8px_32px_rgba(0,0,0,0.15)]
            sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28
            transition-all duration-300 hover:scale-105 hover:border-white/50
            hover:shadow-[0_8px_40px_rgba(22,131,199,0.3)]
            animate-fade-in-up"
        >
          <UtensilsCrossed
            strokeWidth={2.2}
            className="h-8 w-8 text-white sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 drop-shadow-lg"
          />
        </div>

        <h1
          className="mt-4 text-3xl font-extrabold text-white drop-shadow-xl
            sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
            tracking-tight animate-fade-in-up stagger-2"
          style={{
            fontFamily: 'var(--font-display), var(--font-inter), system-ui, sans-serif',
            textShadow: '0 2px 16px rgba(0,0,0,0.3)',
          }}
        >
          {t('common.brandName')}
        </h1>

        <p className="mt-1.5 max-w-md text-sm font-medium text-white/90
          drop-shadow-md sm:mt-3 sm:max-w-lg sm:text-base md:text-lg lg:text-xl
          animate-fade-in-up stagger-3">
          {t('header.tagline')}
        </p>

        {/* Shimmer line */}
        <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-white/80 to-transparent
          sm:mt-5 sm:w-24 shadow-[0_0_12px_rgba(255,255,255,0.3)]
          animate-fade-in stagger-4" />

        {/* ── Trust Badges ── */}
        <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3 animate-fade-in-up stagger-5">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5
                rounded-full bg-white/10 backdrop-blur-sm
                border border-white/10
                text-white/85 text-[11px] sm:text-xs font-medium
                transition-all duration-300
                hover:bg-white/15 hover:border-white/20"
            >
              <badge.icon size={13} style={{ color: badge.color }} className="flex-shrink-0" />
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Shimmer overlay sweep ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 w-1/3 h-full
            bg-gradient-to-r from-transparent via-white/[0.04] to-transparent
            -skew-x-12"
          style={{ animation: 'shimmerLine 6s ease-in-out infinite' }}
        />
      </div>
    </header>
  );
}