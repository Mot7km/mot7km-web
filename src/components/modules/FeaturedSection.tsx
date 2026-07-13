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

  if (!products.length) return null;

  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-montserrat font-semibold text-2xl leading-8 text-[var(--color-text-primary)]">
          {sectionTitle}
        </h2>
        {showCount && (
          <span className="text-xs text-[var(--color-text-muted)] opacity-60">
            {t('productList.countOf', { count: visibleItems.length, total: products.length })}
          </span>
        )}
      </div>

      {/* Grid layout for consistent card sizing */}
      <div className="grid grid-cols-1 gap-4 justify-items-center">
        {visibleItems.map((product) => (
          <FeaturedCard key={product.id} product={product} />
        ))}
      </div>

      <ViewMoreButton
        onClick={handleLoadMore}
        hasMore={hasMore}
        label={t('productList.viewMore')}
        variant={0}
      />
      {!hasMore && products.length > 0 && <ThatsIt />}
    </section>
  );
}