'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Review } from '@/data/menu';
import ReviewCard from '@/components/features/ReviewCard';
import { ViewMoreButton, ThatsIt } from '@/components/ui/ViewMore';

interface ReviewSectionProps {
  title?: string;
  reviews: Review[];
  initialCount?: number;
  loadMoreCount?: number;
}

export default function ReviewSection({
  title,
  reviews,
  initialCount = 1,
  loadMoreCount = 1,
}: ReviewSectionProps) {
  const t = useTranslations();
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const hasMore = visibleCount < reviews.length;
  const visibleItems = reviews.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(initialCount);
  }, [reviews, initialCount]);

  const handleLoadMore = () => {
    setVisibleCount(Math.min(visibleCount + loadMoreCount, reviews.length));
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;
  const avgNum = avgRating ? parseFloat(avgRating) : 0;
  const filledStars = Math.round(avgNum);

  if (!reviews.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-[var(--color-text-muted)]">
        <p className="text-sm">{t('reviews.empty') || 'No reviews yet'}</p>
      </div>
    );
  }

  const sectionTitle = title || t('reviews.title');

  return (
    <section className="flex flex-col gap-5 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 border-b border-[var(--color-divider)] pb-3">
        <h2
          className="accent-line font-bold text-base sm:text-xl md:text-2xl leading-6 sm:leading-8 text-[var(--color-text-primary)] truncate min-w-0 flex-1"
          style={{ fontFamily: 'var(--font-display), var(--font-inter), system-ui, sans-serif' }}
        >
          {sectionTitle}
        </h2>

        {/* Rating summary */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 px-3 py-1.5 rounded-full bg-[var(--color-warning)]/8 border border-[var(--color-warning)]/15">
          <span
            className="font-extrabold text-lg sm:text-xl md:text-2xl text-[var(--color-warning-dark)]"
            style={{ fontFamily: 'var(--font-display), var(--font-inter), system-ui, sans-serif' }}
          >
            {avgRating}
          </span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                width={14}
                height={13}
                viewBox="0 0 20 20"
                className="sm:w-4 sm:h-4 text-[var(--color-warning)] min-w-[12px] min-h-[12px]"
                fill={i < filledStars ? 'var(--color-warning)' : 'var(--color-border)'}
              >
                <path
                  d="M10 0L12.653 6.202L19.511 6.955L14.232 11.872L15.706 18.798L10 15.6L4.294 18.798L5.768 11.872L0.489 6.955L7.347 6.202L10 0Z"
                  fill="currentColor"
                />
              </svg>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="flex flex-col gap-3 w-full">
        {visibleItems.map((review, index) => (
          <div
            key={review.reviewer + review.date}
            className="w-full animate-fade-in-up"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      {/* View More / ThatsIt */}
      <div className="flex flex-col items-center gap-3 pt-1">
        <ViewMoreButton
          onClick={handleLoadMore}
          hasMore={hasMore}
          label={t('reviews.viewMore')}
          variant={1}
        />
        {!hasMore && reviews.length > 0 && <ThatsIt />}
      </div>
    </section>
  );
}