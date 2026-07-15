'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { THEME_STORAGE_KEY } from '@/config/theme';
import { Moon, Sun, Monitor } from 'lucide-react';

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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

  if (!mounted) return null;

  const activeLight = theme === 'light' || (theme === 'system' && resolvedTheme === 'light');
  const activeDark = theme === 'dark' || (theme === 'system' && resolvedTheme === 'dark');

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

  const isActive = (mode: string) => {
    if (mode === 'light') return activeLight;
    if (mode === 'dark') return activeDark;
    return theme === 'system';
  };

  return (
    <div className="flex items-center gap-1 p-1 bg-[var(--color-surface)] rounded-full border border-[var(--color-border)] shadow-sm">
      {[
        { mode: 'light', icon: Sun, label: 'Light' },
        { mode: 'dark', icon: Moon, label: 'Dark' },
        { mode: 'system', icon: Monitor, label: 'System' },
      ].map(({ mode, icon: Icon, label }) => {
        const active = isActive(mode);
        return (
          <button
            key={mode}
            onClick={() => {
              setTheme(mode as any);
              applyTheme(mode as any);
            }}
            className={`
              relative flex items-center justify-center
              w-9 h-9 rounded-full
              transition-all duration-200 ease-out
              hover:scale-105 active:scale-95
              cursor-pointer
              ${
                active
                  ? 'bg-[var(--color-primary)] text-[var(--color-text-on-primary)] shadow-[var(--color-primary)]/30'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border)]'
              }
            `}
            title={label}
            aria-label={label}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}