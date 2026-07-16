'use client';

import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const t = useTranslations();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="sticky top-0 z-50 w-full py-3">
      <div className="mx-auto max-w-4xl">
        <form onSubmit={handleSubmit} className="relative group">
          <div className="relative rounded-full glass border-[var(--color-border)] overflow-hidden transition-all duration-300 group-focus-within:shadow-[var(--shadow-glow)]">
            {/* Search Icon */}
            <div className="absolute left-1 top-1 bottom-1 flex items-center pl-4 pointer-events-none">
              <Search className="w-5 h-5 text-[var(--color-primary)] transition-transform duration-300 group-focus-within:scale-110" />
            </div>
            {/* Input */}
            <input
              type="text"
              placeholder={t('search.placeholder')}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-transparent rounded-full
                focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 focus:border-transparent
                transition-all duration-300
                text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
            />
          </div>
        </form>
      </div>
    </div>
  );
}