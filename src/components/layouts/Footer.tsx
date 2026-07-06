import { Utensils } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-sm py-8 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Brand Name */}
          <div className="flex items-center gap-2 text-xl font-bold text-[var(--color-text-primary)]">
            <Utensils strokeWidth={3} className="h-6 w-6 text-[var(--color-primary)]" />
            The Gourmet Kitchen
          </div>

          {/* Navigation Links */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <a
              href="#"
              className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]"
            >
              Contact Support
            </a>
          </div>

          {/* Copyright & Powering */}
          <div className="mt-4 text-sm text-[var(--color-text-muted)]">
            © {currentYear} The Gourmet Kitchen. Powered by{' '}
            <span className="font-semibold text-[var(--color-primary)]">
              Mot7km
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}