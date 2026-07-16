'use client';

import { Utensils } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-surface)] py-10 transition-colors">
      {/* Gradient top accent line */}
      <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: 'var(--gradient-primary)' }} />

      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-24 bg-[var(--color-primary)]/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-4">
          {/* Brand Name */}
          <div className="flex items-center gap-2.5">
            <span
              className="gradient-text text-xl font-extrabold tracking-tight"
              style={{ fontFamily: 'var(--font-display), var(--font-inter), system-ui, sans-serif' }}
            >
              {t('common.brandName')}
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
              <Utensils strokeWidth={2.5} className="h-4 w-4 text-[var(--color-primary)]" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            {[
              { label: t('footer.aboutUs'), href: '#' },
              { label: t('footer.termsOfService'), href: '#' },
              { label: t('footer.contactSupport'), href: '#' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-primary)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="section-divider w-48 my-1" />

          {/* Copyright & Powering */}
          <p className="text-xs text-[var(--color-text-muted)]">
            {t('footer.copyrightText', {
              year: currentYear,
              brand: t('common.brandName'),
              provider: 'Mot7km'
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}