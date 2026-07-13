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

  // Average rating
  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;
  const avgNum = avgRating ? parseFloat(avgRating) : 0;
  const filledStars = Math.round(avgNum);

  if (!reviews.length) return null;

  const sectionTitle = title || t('reviews.title');

  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center w-full">
        <h3 className="font-montserrat font-semibold text-xl leading-7 text-[var(--color-text-primary)]">
          {sectionTitle}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-montserrat font-bold text-3xl leading-10 tracking-[-0.64px] text-[var(--color-primary)]">
            {avgRating}
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
      </div>

      <div className="flex flex-col gap-4 w-full">
        {visibleItems.map((review) => (
          <ReviewCard key={review.reviewer + review.date} review={review} />
        ))}
      </div>

      <ViewMoreButton
        onClick={handleLoadMore}
        hasMore={hasMore}
        label={t('reviews.viewMore')}
        variant={1}
      />
      {!hasMore && reviews.length > 0 && <ThatsIt />}
    </section>
  );
}