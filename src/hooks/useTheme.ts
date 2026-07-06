'use client';

import { useTheme as useNextTheme } from 'next-themes';

export function useTheme() {
  const { theme, setTheme, resolvedTheme, themes } = useNextTheme();

  return {
    theme,
    setTheme,
    resolvedTheme,
    themes,
  };
}
