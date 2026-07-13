'use client';

import { useTranslations } from 'next-intl';

interface ViewMoreButtonProps {
  onClick: () => void;
  hasMore: boolean;
  label: string;
  variant?: 0 | 1; // 0 = product, 1 = review
}

export function ViewMoreButton({
  onClick,
  hasMore,
  label,
  variant = 0,
}: ViewMoreButtonProps) {
  if (!hasMore) return null;

  const isProduct = variant === 0;

  return (
    <button
      onClick={onClick}
      className={
        isProduct
          ? 'flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-[var(--color-primary)] text-[var(--color-text-on-primary)] text-sm font-medium hover:bg-[var(--color-primary-dark)] transition-colors cursor-pointer'
          : 'flex justify-center items-center w-full py-2 rounded-lg text-[var(--color-primary)] font-inter font-semibold text-sm leading-5 tracking-[0.14px] hover:bg-[var(--color-border)] transition-colors cursor-pointer'
      }
    >
      <span>{label}</span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 10.5L3.5 6L4.5 5L8 8.5L11.5 5L12.5 6L8 10.5Z" fill="currentColor" />
      </svg>
    </button>
  );
}

// The "ThatsIt" component is unchanged; it’s not related to the variant.
export function ThatsIt() {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-sm text-[var(--color-text-muted)] opacity-70 font-inter">
        {t('productList.thatsIt')}
      </p>
    </div>
  );
}