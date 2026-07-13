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

  return (
    <div className="flex flex-col items-start p-4 gap-2 w-full bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-xl">
      <div className="flex justify-between items-center w-full">
        <span className="font-inter font-semibold text-sm leading-5 tracking-[0.14px] text-[var(--color-text-primary)]">
          {review.reviewer}
        </span>
        <span className="font-inter font-medium text-xs leading-4 tracking-[0.48px] text-[var(--color-text-muted)]">
          {formatRelativeDate(review.date, t)}
        </span>
      </div>

      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            width="15"
            height="14.25"
            viewBox="0 0 16 16"
            fill={i < filledStars ? 'var(--color-primary)' : 'var(--color-text-muted)'}
          >
            <path d="M8 0L9.796 5.527L15.608 5.527L10.906 8.944L12.702 14.472L8 11.056L3.298 14.472L5.094 8.944L0.392 5.527L6.204 5.527L8 0Z" />
          </svg>
        ))}
      </div>

      <p className="font-inter font-normal text-sm leading-5 text-[var(--color-text-secondary)] w-full">
        {review.comment}
      </p>
    </div>
  );
}