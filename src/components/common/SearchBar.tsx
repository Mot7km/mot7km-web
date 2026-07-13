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
    <div className="sticky top-0 z-50 w-full backdrop-blur-sm  py-3">
      <div className="mx-auto max-w-4xl">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative rounded-full border border-[var(--color-border)] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] bg-[var(--color-surface)]">
            {/* Search Icon */}
            <div className="absolute left-1 top-1 bottom-1 flex items-center pl-4 pointer-events-none">
              <Search className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            {/* Input */}
            <input
              type="text"
              placeholder={t('search.placeholder')}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full pl-12 pr-4 py-[14px] bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-shadow text-base text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-muted)]"
            />
          </div>
        </form>
      </div>
    </div>
  );
}