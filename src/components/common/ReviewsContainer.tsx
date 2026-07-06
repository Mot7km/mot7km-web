'use client';

import { useState } from 'react';
import { Review } from '@/data/menu';

// ────────────────────────────────────────────
// Helper: format date as relative time
// ────────────────────────────────────────────
function formatRelativeDate(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) {
    return diffYears === 1 ? 'a year ago' : `${diffYears} years ago`;
  }
  if (diffMonths > 0) {
    return diffMonths === 1 ? 'a month ago' : `${diffMonths} months ago`;
  }
  if (diffDays > 0) {
    return diffDays === 1 ? 'yesterday' : `${diffDays} days ago`;
  }
  if (diffHours > 0) {
    return diffHours === 1 ? 'an hour ago' : `${diffHours} hours ago`;
  }
  if (diffMinutes > 0) {
    return diffMinutes === 1 ? 'a minute ago' : `${diffMinutes} minutes ago`;
  }
  return 'just now';
}

// ReviewCard
export function ReviewCard({ review }: { review: Review }) {
  const filledStars = Math.round(review.rating);

  return (
    <div className="flex flex-col items-start p-4 gap-2 w-full bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-xl">
      <div className="flex justify-between items-center w-full">
        <span className="font-inter font-semibold text-sm leading-5 tracking-[0.14px] text-[var(--color-text-primary)]">
          {review.reviewer}
        </span>
        <span className="font-inter font-medium text-xs leading-4 tracking-[0.48px] text-[var(--color-text-muted)]">
          {formatRelativeDate(review.date)}
        </span>
      </div>

      {/* Stars */}
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

// ReviewsContainer
interface ReviewsContainerProps {
  reviews: Review[];
  initialVisible?: number;
  loadMoreCount?: number;
  title?: string;
}

export function ReviewsContainer({
  reviews,
  initialVisible = 2,
  loadMoreCount = 2,
  title = 'Reviews',
}: ReviewsContainerProps) {
  const [visibleCount, setVisibleCount] = useState(initialVisible);
  const hasMore = visibleCount < reviews.length;
  const visibleReviews = reviews.slice(0, visibleCount);

  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  const average = reviews.length > 0 ? (total / reviews.length).toFixed(1) : '0.0';
  const avgNum = parseFloat(average);
  const filledStars = Math.round(avgNum);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + loadMoreCount, reviews.length));
  };

  return (
    <div className="flex flex-col items-start gap-4 w-full">
      <div className="flex justify-between items-center w-full">
        <h3 className="font-montserrat font-semibold text-xl leading-7 text-[var(--color-text-primary)]">
          {title}
        </h3>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="font-montserrat font-bold text-3xl leading-10 tracking-[-0.64px] text-[var(--color-primary)]">
              {average}
            </span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  width="20"
                  height="19"
                  viewBox="0 0 16 16"
                  fill={i < filledStars ? 'var(--color-primary)' : 'var(--color-text-muted)'}
                >
                  <path d="M8 0L9.796 5.527L15.608 5.527L10.906 8.944L12.702 14.472L8 11.056L3.298 14.472L5.094 8.944L0.392 5.527L6.204 5.527L8 0Z" />
                </svg>
              ))}
            </div>
          </div>
        )}
      </div>

      {visibleReviews.length > 0 ? (
        <div className="flex flex-col gap-4 w-full">
          {visibleReviews.map((review, idx) => (
            <ReviewCard key={idx} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-[var(--color-text-muted)]">No reviews yet.</p>
      )}

      {hasMore && (
        <button
          onClick={handleLoadMore}
          className="flex justify-center items-center w-full py-2 rounded-lg text-[var(--color-primary)] font-inter font-semibold text-sm leading-5 tracking-[0.14px] hover:bg-[var(--color-border)] transition-colors"
        >
          <span>View More</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 10.5L3.5 6L4.5 5L8 8.5L11.5 5L12.5 6L8 10.5Z" fill="currentColor" />
          </svg>
        </button>
      )}
    </div>
  );
}