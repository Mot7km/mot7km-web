'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Product } from '@/data/menu';
import { FeaturedCard } from '@/components/features/ProductCards';
import { ViewMoreButton, ThatsIt } from '@/components/ui/ViewMore';

interface FeaturedSectionProps {
  title?: string;
  products: Product[];
  initialCount?: number;      // default: all (show all if not provided)
  loadMoreCount?: number;     // default: 1
  showCount?: boolean;        // default: false
}

export default function FeaturedSection({
  title,
  products,
  initialCount,
  loadMoreCount = 1,
  showCount = false,
}: FeaturedSectionProps) {
  const t = useTranslations();
  const sectionTitle = title || t('productList.featured');

  // If initialCount is not provided, show all
  const [visibleCount, setVisibleCount] = useState(
    initialCount !== undefined ? Math.min(initialCount, products.length) : products.length
  );
  const hasMore = visibleCount < products.length;
  const visibleItems = products.slice(0, visibleCount);

  useEffect(() => {
    if (initialCount !== undefined) {
      setVisibleCount(Math.min(initialCount, products.length));
    } else {
      setVisibleCount(products.length);
    }
  }, [products, initialCount]);

  const handleLoadMore = () => {
    setVisibleCount(Math.min(visibleCount + loadMoreCount, products.length));
  };

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-[var(--color-text-muted)]">
        <p className="text-sm">{t('productList.empty') || 'No products available'}</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="font-montserrat font-semibold text-2xl leading-8 text-[var(--color-text-primary)]">
          {sectionTitle}
        </h2>
        <div className="flex items-center gap-3">
          {showCount && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-xs font-medium text-[var(--color-accent-dark)] border border-[var(--color-accent)]/20">
              {t('productList.countOf', { count: visibleItems.length, total: products.length })}
            </span>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 justify-items-center">
        {visibleItems.map((product, index) => (
          <div
            key={product.id}
            className="w-full transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-lg hover:shadow-[var(--color-primary)]/5"
            style={{
              animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`,
            }}
          >
            <FeaturedCard product={product} />
          </div>
        ))}
      </div>

      {/* View More / ThatsIt */}
      <div className="flex flex-col items-center gap-3 pt-2">
        <ViewMoreButton
          onClick={handleLoadMore}
          hasMore={hasMore}
          label={t('productList.viewMore')}
          variant={0}
        />
        {!hasMore && products.length > 0 && <ThatsIt />}
      </div>

      {/* Optional: animation keyframes – add in global CSS or use Tailwind's animate-* */}
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