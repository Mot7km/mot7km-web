'use client';

import { useTranslations } from 'next-intl';
import { Review } from '@/data/menu';
import formatRelativeDate from '@/helpers/formatRelativeTime';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const t = useTranslations();
  const filledStars = Math.round(review.rating);
  const initials = review.reviewer
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="group flex flex-col gap-2.5 p-4 w-full
        bg-[var(--color-surface)]
        border border-[var(--color-border)]
        rounded-xl
        transition-all duration-300 ease-out
        hover:border-[var(--color-primary)]/40"
      style={{ boxShadow: 'var(--shadow-xs)' }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-xs)'; }}
    >
      {/* Header: Avatar + Name + Date */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          {/* Avatar with gradient ring */}
          <div className="relative">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full
                text-[var(--color-text-on-primary)] font-semibold text-sm
                flex-shrink-0"
              style={{ background: 'var(--gradient-primary)' }}
            >
              {initials || '👤'}
            </div>
          </div>
          <span className="font-semibold text-sm leading-5 text-[var(--color-text-primary)]">
            {review.reviewer}
          </span>
        </div>
        <span className="font-medium text-xs leading-4 tracking-wide text-[var(--color-text-muted)] flex-shrink-0">
          {formatRelativeDate(review.date, t)}
        </span>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            width="15"
            height="15"
            viewBox="0 0 20 20"
            fill={i < filledStars ? 'var(--color-warning)' : 'var(--color-border)'}
            className={`transition-colors duration-200 ${
              i < filledStars ? 'text-[var(--color-warning)]' : 'text-[var(--color-border)]'
            }`}
          >
            <path
              d="M10 0L12.653 6.202L19.511 6.955L14.232 11.872L15.706 18.798L10 15.6L4.294 18.798L5.768 11.872L0.489 6.955L7.347 6.202L10 0Z"
              fill="currentColor"
            />
          </svg>
        ))}
      </div>

      {/* Comment */}
      <p className="font-normal text-sm leading-relaxed text-[var(--color-text-secondary)] w-full">
        {review.comment}
      </p>
    </div>
  );
}