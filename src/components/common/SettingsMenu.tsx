'use client';

import { useEffect, useState, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { THEME_STORAGE_KEY } from '@/config/theme';
import { i18n } from '@/config/i18n';
import { Settings, Sun, Moon, Monitor, Globe, Check } from 'lucide-react';

export function SettingsMenu() {
  const t = useTranslations();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as 'light' | 'dark' | 'system' | null;
      if (stored) {
        applyTheme(stored === 'system' ? 'system' : stored);
      } else if (theme) {
        applyTheme(theme === 'system' ? 'system' : (theme as 'light' | 'dark'));
      }
    } catch (e) {}
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  if (!mounted) return null;

  // ─── Theme logic ───
  const applyTheme = (name: 'light' | 'dark' | 'system') => {
    try {
      if (name === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', prefersDark);
      } else {
        document.documentElement.classList.toggle('dark', name === 'dark');
      }
      localStorage.setItem(THEME_STORAGE_KEY, name);
    } catch (e) {}
  };

  const handleThemeChange = (mode: 'light' | 'dark' | 'system') => {
    setTheme(mode);
    applyTheme(mode);
  };

  const currentTheme = theme || 'system';

  // ─── Language logic ───
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = segments[0] && i18n.locales.includes(segments[0] as (typeof i18n.locales)[number])
    ? segments[0]
    : locale;

  const getLocalizedPath = (newLocale: string) => {
    const segs = pathname.split('/').filter(Boolean);
    const hasLocalePrefix = segs[0] && i18n.locales.includes(segs[0] as (typeof i18n.locales)[number]);
    if (hasLocalePrefix) {
      segs[0] = newLocale;
    } else {
      segs.unshift(newLocale);
    }
    return `/${segs.join('/')}`;
  };

  const switchLocale = (newLocale: string) => {
    if (newLocale === currentLocale) return;
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax; Secure`;
    router.push(getLocalizedPath(newLocale));
    router.refresh();
    setOpen(false);
  };

  // ─── Config ───
  const themeOptions = [
    { id: 'light' as const, icon: Sun, label: t('settings.light') },
    { id: 'dark' as const, icon: Moon, label: t('settings.dark') },
    { id: 'system' as const, icon: Monitor, label: t('settings.system') },
  ];

  const languageOptions = i18n.locales.map((loc) => ({
    id: loc,
    label: loc === 'en' ? t('languages.en') : t('languages.ar'),
  }));

  return (
    <div ref={menuRef} className="relative z-30">
      {/* ─── Trigger Button ─── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`
          flex items-center justify-center
          w-10 h-10 rounded-full
          transition-all duration-250 ease-out
          cursor-pointer
          hover:scale-105 active:scale-95
          ${open
            ? 'text-white shadow-lg'
            : 'glass text-white/80 hover:text-white'
          }
        `}
        style={open ? { background: 'var(--gradient-primary)' } : undefined}
        aria-label={t('settings.title')}
        aria-expanded={open}
      >
        <Settings className={`h-[18px] w-[18px] transition-transform duration-300 ${open ? 'rotate-90' : ''}`} />
      </button>

      {/* ─── Dropdown Menu ─── */}
      {open && (
        <div
          className="absolute end-0 top-[calc(100%+8px)] w-56
            glass rounded-2xl
            shadow-xl
            animate-scale-in origin-top-right
            overflow-hidden
            z-30"
        >
          {/* Language Section */}
          <div className="px-3 pt-3 pb-1">
            <div className="flex items-center gap-2 px-1 pb-2">
              <Globe className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                {t('settings.language')}
              </span>
            </div>
            <div className="flex gap-1.5">
              {languageOptions.map((lang) => {
                const isActive = currentLocale === lang.id;
                return (
                  <button
                    key={lang.id}
                    onClick={() => switchLocale(lang.id)}
                    className={`
                      flex-1 flex items-center justify-center gap-1.5
                      py-2 rounded-xl text-sm font-medium
                      transition-all duration-200 ease-out
                      cursor-pointer
                      ${isActive
                        ? 'text-[var(--color-text-on-primary)] shadow-md'
                        : 'bg-[var(--color-primary-50)] text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-100)]'
                      }
                    `}
                    style={isActive ? { background: 'var(--gradient-primary)' } : undefined}
                  >
                    {isActive && <Check className="h-3 w-3" />}
                    {lang.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="section-divider mx-3 my-2" />

          {/* Theme Section */}
          <div className="px-3 pt-1 pb-3">
            <div className="flex items-center gap-2 px-1 pb-2">
              <Sun className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                {t('settings.theme')}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              {themeOptions.map(({ id, icon: Icon, label }) => {
                const isActive = currentTheme === id;
                return (
                  <button
                    key={id}
                    onClick={() => handleThemeChange(id)}
                    className={`
                      flex items-center gap-3
                      w-full px-3 py-2.5 rounded-xl
                      text-sm font-medium
                      transition-all duration-200 ease-out
                      cursor-pointer
                      ${isActive
                        ? 'text-[var(--color-text-on-primary)] shadow-md'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-50)]'
                      }
                    `}
                    style={isActive ? { background: 'var(--gradient-primary)' } : undefined}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span className="flex-1 text-start">{label}</span>
                    {isActive && <Check className="h-3.5 w-3.5 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
