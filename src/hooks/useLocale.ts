import { usePathname } from 'next/navigation';
import { i18n } from '@/config/i18n';

export function useLocale() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const locale =
    segments[0] && i18n.locales.includes(segments[0] as any)
      ? segments[0]
      : i18n.defaultLocale;
  return locale;
}