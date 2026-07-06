import { UtensilsCrossed } from 'lucide-react';
import { ThemeSwitcher } from '@/components/common/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';

export function Header() {
  return (
    <header
      className="relative flex min-h-[40vh] w-full items-end justify-start px-5 py-5 bg-cover bg-center bg-no-repeat rounded-b-4xl overflow-hidden"
      style={{ backgroundImage: "url('/download.png')" }}
    >
      {/* Dark overlay – kept as black because no theme variable exists for a generic overlay */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />

      {/* Top right: switchers */}
      <div className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full bg-[var(--color-text-on-primary)]/10 px-3 py-2 backdrop-blur-md sm:right-6 sm:top-6 sm:gap-3">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-start px-4 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-[var(--color-text-on-primary)]/30 bg-[var(--color-text-on-primary)]/10 backdrop-blur-sm shadow-2xl sm:h-28 sm:w-28 md:h-32 md:w-32">
          <UtensilsCrossed
            strokeWidth={2.5}
            className="h-12 w-12 text-[var(--color-text-on-primary)] sm:h-14 sm:w-14 md:h-16 md:w-16"
          />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-[var(--color-text-on-primary)] drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
          The Gourmet Kitchen
        </h1>
        <p className="mt-2 text-base font-medium text-[var(--color-text-on-primary)]/90 drop-shadow-md sm:text-lg md:text-xl">
          Premium Flavors, Delivered
        </p>
      </div>
    </header>
  );
}