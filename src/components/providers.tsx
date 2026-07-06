'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { THEME_STORAGE_KEY } from '@/config/theme';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey={THEME_STORAGE_KEY}>
      {children}
    </ThemeProvider>
  );
}
