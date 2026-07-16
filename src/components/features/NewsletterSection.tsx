'use client';

import { useTranslations } from 'next-intl';
import { Mail } from 'lucide-react';

export function NewsletterSection() {
  const t = useTranslations('newsletter');

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)] border-t border-[var(--color-divider)]">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[var(--color-primary-50)] flex items-center justify-center text-[var(--color-primary)] mb-2 shadow-sm">
          <Mail size={32} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display), system-ui' }}>
          {t('title')}
        </h2>
        <p className="text-base text-[var(--color-text-secondary)] max-w-md">
          {t('subtitle')}
        </p>
        
        <form 
          className="w-full max-w-md flex flex-col sm:flex-row gap-3 mt-4"
          onSubmit={(e) => { e.preventDefault(); }}
        >
          <div className="flex-1 relative">
            <input 
              type="email" 
              required
              placeholder={t('placeholder')}
              className="w-full h-12 px-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all placeholder:text-[var(--color-text-muted)] shadow-sm"
            />
          </div>
          <button 
            type="submit"
            className="h-12 px-6 rounded-xl font-semibold text-white transition-all shadow-md active:scale-95 flex items-center justify-center"
            style={{ background: 'var(--gradient-primary)' }}
          >
            {t('button')}
          </button>
        </form>
      </div>
    </section>
  );
}
