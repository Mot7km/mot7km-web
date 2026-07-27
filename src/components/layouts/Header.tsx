'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  UtensilsCrossed,
  Phone,
  MapPin,
  Clock,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { SettingsMenu } from '@/components/common/SettingsMenu';
import { storeInfo, isStoreOpen, getTodayHours } from '@/data/storeInfo';

// ─── Social Icon ───
function SocialIcon({ platform, className }: { platform: string; className?: string }) {
  const paths: Record<string, string> = {
    whatsapp:
      'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z',
    instagram:
      'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
    facebook:
      'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    tiktok:
      'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d={paths[platform] || ''} />
    </svg>
  );
}

// ─── Social colour map ───
const socialColorMap: Record<string, string> = {
  whatsapp: '#25D366',
  instagram: '#E4405F',
  facebook: '#1877F2',
  tiktok: '#000000',
};

// ─── Helper: format "HH:mm" to 12-hour ───
function formatTime(time24: string): string {
  const [h, m] = time24.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, '0')} ${suffix}`;
}

// ═══════════════════════════════════════════════════════════════════
// HEADER – beautifully responsive, no jamming, no forced full‑width rows
// ═══════════════════════════════════════════════════════════════════
export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(isStoreOpen());
    const timer = setInterval(() => setOpen(isStoreOpen()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const todayHours = getTodayHours();
  const displayAddress = isRTL ? storeInfo.addressAr : storeInfo.address;

  return (
    <header
      className="relative flex min-h-[38vh] sm:min-h-[44vh] lg:min-h-[48vh] w-full flex-col items-start justify-end rounded-b-[2rem] sm:rounded-b-[2.5rem] overflow-hidden py-4"
      style={{
        background: 'var(--gradient-hero)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 8s ease-in-out infinite alternate',
      }}
    >
      {/* ── Decorative layers ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20" />
        <div className="absolute -top-20 -end-20 w-72 h-72 rounded-full bg-[var(--color-accent)]/20 opacity-60 animate-orb-1" />
        <div className="absolute -bottom-16 -start-16 w-56 h-56 rounded-full bg-[var(--color-primary)]/25 opacity-50 animate-orb-2" />
        <div className="absolute top-1/2 start-1/3 w-40 h-40 rounded-full bg-[var(--color-secondary)]/15 opacity-40 animate-breathe" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/15 to-transparent" />
      </div>

      {/* ── Settings gear ── */}
      <div className="absolute end-3 top-3 z-20 sm:end-5 sm:top-5">
        <SettingsMenu />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-col items-start px-4 pb-5 sm:px-6 sm:pb-7 md:pb-9 lg:px-8 lg:pb-11 w-full">
        {/* ── Row 1: Logo + Status ── */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 w-full animate-fade-in-up">
          <div
            className="flex h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24
              items-center justify-center rounded-2xl
              border border-white/30 bg-white/15 backdrop-blur-md
              shadow-[0_8px_32px_rgba(0,0,0,0.15)]
              transition-all duration-300 hover:scale-105 hover:border-white/50
              hover:shadow-[0_8px_40px_rgba(22,131,199,0.3)]
              flex-shrink-0"
          >
            <UtensilsCrossed
              strokeWidth={2.2}
              className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 drop-shadow-lg text-white"
            />
          </div>

          <div className="flex flex-col items-start gap-1">
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider border
                ${open
                  ? 'bg-[var(--color-success)]/20 text-[var(--color-success)] border-[var(--color-success)]/30'
                  : 'bg-[var(--color-error)]/20 text-[var(--color-error)] border-[var(--color-error)]/30'
                }`}
            >
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${open ? 'bg-[var(--color-success)] animate-ping' : 'bg-[var(--color-error)]'}`}
                />
                <span
                  className={`relative inline-flex h-full w-full rounded-full ${open ? 'bg-[var(--color-success)]' : 'bg-[var(--color-error)]'}`}
                />
              </span>
              {open ? t('storeInfo.open') : t('storeInfo.closed')}
            </div>
            {todayHours && (
              <div className="flex items-center gap-1 text-[10px] sm:text-xs text-white/80 font-medium">
                <Clock size={12} className="text-white/60 sm:h-3.5 sm:w-3.5" />
                <span>{formatTime(todayHours.open)} – {formatTime(todayHours.close)}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Brand name ── */}
        <h1
          className="mt-3 sm:mt-4 md:mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
            font-extrabold text-white drop-shadow-xl tracking-tight
            animate-fade-in-up stagger-1"
          style={{
            fontFamily: 'var(--font-display), var(--font-inter), system-ui, sans-serif',
            textShadow: '0 2px 16px rgba(0,0,0,0.3)',
          }}
        >
          {t('common.brandName')}
        </h1>

        {/* ── Tagline ── */}
        <p className="mt-0.5 sm:mt-1 max-w-xs sm:max-w-md text-xs sm:text-sm md:text-base lg:text-lg
          font-medium text-white/90 drop-shadow-md
          animate-fade-in-up stagger-2">
          {t('header.tagline')}
        </p>

        {/* ── Shimmer line ── */}
        <div className="mt-3 sm:mt-4 h-0.5 w-12 sm:w-16 rounded-full bg-gradient-to-r from-white/80 to-transparent
          shadow-[0_0_12px_rgba(255,255,255,0.3)] animate-fade-in stagger-3" />

        {/* ── CONTACT INFO – glass card with flexible row ── */}
        <div className="mt-4 sm:mt-5 w-full animate-fade-in-up stagger-4">
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-3 sm:p-4
              shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4">
              {/* Phone */}
              <a
                href={`tel:${storeInfo.phone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                  bg-white/10 border border-white/10
                  text-white/90 text-xs font-medium
                  hover:bg-white/20 transition-colors"
              >
                <Phone size={14} className="text-white/70 flex-shrink-0" />
                <span dir="ltr" className="font-mono">{storeInfo.phone}</span>
              </a>

              {/* Email */}
              {storeInfo.email && (
                <a
                  href={`mailto:${storeInfo.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                    bg-white/10 border border-white/10
                    text-white/90 text-xs font-medium
                    hover:bg-white/20 transition-colors"
                >
                  <Mail size={14} className="text-white/70 flex-shrink-0" />
                  <span>{storeInfo.email}</span>
                </a>
              )}

              {/* Address */}
              <a
                href={storeInfo.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                  bg-white/10 border border-white/10
                  text-white/90 text-xs font-medium
                  hover:bg-white/20 transition-colors"
              >
                <MapPin size={14} className="text-white/70 flex-shrink-0" />
                <span className="break-words">{displayAddress}</span>
                <ExternalLink size={12} className="opacity-50 flex-shrink-0" />
              </a>

              {/* Socials – pushed right on larger screens */}
              <div className="flex items-center gap-1.5 sm:ml-auto">
                {storeInfo.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 h-8 rounded-full
                      bg-white/10 border border-white/10
                      hover:bg-white/20 hover:scale-110 active:scale-95
                      transition-all duration-300 group"
                    aria-label={social.platform}
                    style={{ '--social-color': socialColorMap[social.platform] } as React.CSSProperties}
                  >
                    <SocialIcon
                      platform={social.platform}
                      className="w-4 h-4 text-white/80 group-hover:text-[var(--social-color)] transition-colors"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Shimmer overlay sweep ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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