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
      className="group flex flex-col gap-2 p-4 w-full
        bg-[var(--color-surface)] 
        border border-[var(--color-border)]
        rounded-xl
        shadow-sm hover:shadow-lg hover:shadow-[var(--color-primary)]/5
        hover:border-[var(--color-primary)]
        hover:scale-[1.01]
        transition-all duration-300 ease-out
        active:scale-[0.98]
      "
    >
      {/* Header: Avatar + Name + Date */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="flex items-center justify-center w-9 h-9 rounded-full
              bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20
              text-[var(--color-primary)] font-montserrat font-semibold text-sm
              border border-[var(--color-border)]
              flex-shrink-0
            "
          >
            {initials || '👤'}
          </div>
          <span className="font-inter font-semibold text-sm leading-5 tracking-[0.14px] text-[var(--color-text-primary)]">
            {review.reviewer}
          </span>
        </div>
        <span className="font-inter font-medium text-xs leading-4 tracking-[0.48px] text-[var(--color-text-muted)] flex-shrink-0">
          {formatRelativeDate(review.date, t)}
        </span>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            width="16"
            height="16"
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
      <p className="font-inter font-normal text-sm leading-5 text-[var(--color-text-secondary)] w-full mt-0.5">
        {review.comment}
      </p>
    </div>
  );
}