'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations, useLocale } from 'next-intl';
import {
  UtensilsCrossed,
  Phone,
  MapPin,
  Clock,
  Mail,
  Share2,
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

// ─── Popover with smart viewport-aware positioning ───
function Popover({
  trigger,
  children,
  open,
  onToggle,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const popoverWidth = 240; // matches w-60 (15rem = 240px)
  const popoverMaxHeight = 'calc(100vh - 120px)'; // leave some margin

  useEffect(() => {
    if (!open) return;
    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Start with popover below trigger, right-aligned with trigger's right edge
      let left = rect.right - popoverWidth + window.scrollX;
      let top = rect.bottom + window.scrollY + 8; // 8px gap

      // Clamp horizontal position to stay within viewport
      const margin = 8;
      const minLeft = margin;
      const maxLeft = window.innerWidth - popoverWidth - margin;
      left = Math.max(minLeft, Math.min(left, maxLeft));

      // Clamp vertical position to prevent going off-screen (but we'll also set max-height)
      // We'll just ensure top is at least margin from top
      top = Math.max(margin + window.scrollY, top);

      // If the popover would go below the viewport, we could flip it above,
      // but we rely on max-height and scroll instead.
      // Optionally, we could also set top to be above trigger if there's more space above.
      // For simplicity, we keep it below with scroll.

      setPosition({ top, left });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open]);

  return (
    <div className="relative inline-block">
      <div ref={triggerRef} onClick={onToggle} className="cursor-pointer">
        {trigger}
      </div>
      {open &&
        createPortal(
          <div
            className="fixed w-60 max-h-[calc(100vh-120px)] overflow-y-auto rounded-2xl glass shadow-xl p-3 z-[9999] animate-scale-in origin-top-right"
            style={{
              top: position.top,
              left: position.left,
            }}
          >
            {children}
          </div>,
          document.body
        )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HEADER
// ═══════════════════════════════════════════════════════════════════
export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [open, setOpen] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState<string | null>(null);

  useEffect(() => {
    setOpen(isStoreOpen());
    const timer = setInterval(() => setOpen(isStoreOpen()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const displayAddress = isRTL ? storeInfo.addressAr : storeInfo.address;

  const togglePopover = (id: string) => {
    setPopoverOpen((prev) => (prev === id ? null : id));
  };

  // ── Build weekly schedule ──
  const weekDayNumbers = [0, 1, 2, 3, 4, 5, 6];
  const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  const openingHoursContent = (
    <>
      <div className="flex items-center gap-2 px-1 pb-2">
        <Clock className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          {t('storeInfo.openingHours')}
        </span>
      </div>
      <div className="space-y-1.5">
        {weekDayNumbers.map((dayNum) => {
          const dayLabel = t(`days.${dayKeys[dayNum]}`);
          const entry = storeInfo.workingHours.find((wh) => wh.day === dayNum);
          return (
            <div key={dayNum} className="flex justify-between text-sm">
              <span className="capitalize text-[var(--color-text-secondary)]">{dayLabel}</span>
              {entry ? (
                <span className="font-medium text-[var(--color-text-primary)]">
                  {formatTime(entry.open)} – {formatTime(entry.close)}
                </span>
              ) : (
                <span className="text-[var(--color-text-muted)]">{t('storeInfo.closed')}</span>
              )}
            </div>
          );
        })}
      </div>
    </>
  );

  const socialContent = (
    <>
      <div className="flex items-center gap-2 px-1 pb-2">
        <Share2 className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          {t('storeInfo.socials')}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {storeInfo.socials.map((social) => (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[var(--color-primary-50)] px-3 py-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-100)] transition-colors"
            style={{ color: socialColorMap[social.platform] || 'currentColor' }}
          >
            <SocialIcon platform={social.platform} className="w-4 h-4" />
            <span className="capitalize">{social.platform}</span>
          </a>
        ))}
      </div>
    </>
  );

  // ─── Reusable content helper with optional values ───
  const simpleContent = (
    icon: React.ReactNode,
    label: string,
    value?: string | null,
    href?: string | null
  ) => (
    <>
      <div className="flex items-center gap-2 px-1 pb-2">
        {icon}
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          {label}
        </span>
      </div>
      {value ? (
        href ? (
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-1 text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            {value}
            {href.startsWith('http') && <ExternalLink size={12} />}
          </a>
        ) : (
          <span className="text-sm font-medium text-[var(--color-text-primary)]">{value}</span>
        )
      ) : (
        <span className="text-sm text-[var(--color-text-muted)]">Not available</span>
      )}
    </>
  );

  // ─── Icon button ───
  const iconButton = (icon: React.ReactNode) => (
    <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors group">
      {icon}
    </div>
  );

  return (
    <header
      className="relative flex w-full flex-col items-center justify-center rounded-b-[2rem] sm:rounded-b-[2.5rem] overflow-hidden pt-8 sm:pt-10 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'var(--gradient-hero)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 8s ease-in-out infinite alternate',
      }}
    >
      {/* ── Decorative layers ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20" />
        <div className="absolute -top-20 -end-20 w-64 h-64 rounded-full bg-[var(--color-accent)]/20 opacity-60 animate-orb-1" />
        <div className="absolute -bottom-12 -start-12 w-48 h-48 rounded-full bg-[var(--color-primary)]/25 opacity-50 animate-orb-2" />
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* ── Settings gear ── */}
      <div className="absolute end-3 top-3 z-20 sm:end-5 sm:top-5">
        <SettingsMenu />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 w-full max-w-7xl mx-auto">
        {/* Left side: Logo + Brand */}
        <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-[200px]">
          <div
            className="flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16
              items-center justify-center rounded-lg
              border border-white/30 bg-white/15 backdrop-blur-md
              shadow-[0_8px_32px_rgba(0,0,0,0.15)]
              transition-all duration-300 hover:scale-105 hover:border-white/50
              hover:shadow-[0_8px_40px_rgba(22,131,199,0.3)]
              flex-shrink-0"
          >
            <UtensilsCrossed
              strokeWidth={2.2}
              className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 drop-shadow-lg text-white"
            />
          </div>
          <div className="flex flex-col">
            <h1
              className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white drop-shadow-xl tracking-tight"
              style={{
                fontFamily: 'var(--font-display), var(--font-inter), system-ui, sans-serif',
                textShadow: '0 2px 16px rgba(0,0,0,0.3)',
              }}
            >
              {t('common.brandName')}
            </h1>
            <p className="text-xs sm:text-sm md:text-base font-medium text-white/90 drop-shadow-md -mt-0.5">
              {t('header.tagline')}
            </p>
            <div className="mt-2 h-0.5 w-12 sm:w-16 rounded-full bg-gradient-to-r from-white/80 to-transparent shadow-[0_0_12px_rgba(255,255,255,0.3)] animate-fade-in" />
          </div>
        </div>

        {/* Right side: Icon bar */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap sm:mt-3 ml-15">
          <Popover
            open={popoverOpen === 'phone'}
            onToggle={() => togglePopover('phone')}
            trigger={iconButton(<Phone size={15} className="group-hover:scale-110 transition-transform" />)}
          >
            {simpleContent(
              <Phone className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />,
              t('storeInfo.phone'),
              storeInfo.phone,
              storeInfo.phone ? `tel:${storeInfo.phone}` : null
            )}
          </Popover>

          <Popover
            open={popoverOpen === 'email'}
            onToggle={() => togglePopover('email')}
            trigger={iconButton(<Mail size={15} className="group-hover:scale-110 transition-transform" />)}
          >
            {simpleContent(
              <Mail className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />,
              t('storeInfo.email'),
              storeInfo.email,
              storeInfo.email ? `mailto:${storeInfo.email}` : null
            )}
          </Popover>

          <Popover
            open={popoverOpen === 'address'}
            onToggle={() => togglePopover('address')}
            trigger={iconButton(<MapPin size={15} className="group-hover:scale-110 transition-transform" />)}
          >
            {simpleContent(
              <MapPin className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />,
              t('storeInfo.address'),
              displayAddress,
              displayAddress ? storeInfo.mapUrl : null
            )}
          </Popover>

          <Popover
            open={popoverOpen === 'hours'}
            onToggle={() => togglePopover('hours')}
            trigger={iconButton(<Clock size={15} className="group-hover:scale-110 transition-transform" />)}
          >
            {openingHoursContent}
          </Popover>

          <Popover
            open={popoverOpen === 'socials'}
            onToggle={() => togglePopover('socials')}
            trigger={iconButton(<Share2 size={15} className="group-hover:scale-110 transition-transform" />)}
          >
            {socialContent}
          </Popover>
        </div>
      </div>

      {/* ── Shimmer overlay ── */}
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