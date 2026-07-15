'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Review } from '@/data/menu';
import ReviewCard from '@/components/features/ReviewCard';
import { ViewMoreButton, ThatsIt } from '@/components/ui/ViewMore';

interface ReviewSectionProps {
  title?: string;
  reviews: Review[];
  initialCount?: number;      // default 1
  loadMoreCount?: number;     // default 1
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
    <section className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      {/* Header – responsive layout */}
      <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 border-b border-[var(--color-border)] py-2 sm:py-3">
        {/* Title – shrinks and truncates instead of pushing content */}
        <h2 className="font-montserrat font-semibold text-base sm:text-xl md:text-2xl leading-6 sm:leading-8 text-[var(--color-text-primary)] truncate min-w-0 flex-1">
          {sectionTitle}
        </h2>

        {/* Right side – stays inline, shrinks as needed */}
        <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-3 flex-shrink-0">
          {/* Rating + Stars */}
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="font-montserrat font-bold text-xl sm:text-2xl md:text-3xl leading-7 sm:leading-10 tracking-[-0.64px] text-[var(--color-text-primary)]">
              {avgRating}
            </span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  width={14}
                  height={13}
                  viewBox="0 0 20 20"
                  className="sm:w-4 sm:h-4 md:w-5 md:h-5 text-[var(--color-warning)] min-w-[12px] min-h-[12px]"
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
      </div>

      {/* Reviews Grid */}
      <div className="flex flex-col gap-4 w-full">
        {visibleItems.map((review, index) => (
          <div
            key={review.reviewer + review.date}
            className="w-full transition-all duration-300 ease-out transform hover:scale-[1.01] hover:shadow-md"
            style={{
              animation: `fadeInUp 0.4s ease-out ${index * 0.08}s both`,
            }}
          >
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      {/* View More / ThatsIt */}
      <div className="flex flex-col items-center gap-3 pt-2">
        <ViewMoreButton
          onClick={handleLoadMore}
          hasMore={hasMore}
          label={t('reviews.viewMore')}
          variant={1}
        />
        {!hasMore && reviews.length > 0 && <ThatsIt />}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}