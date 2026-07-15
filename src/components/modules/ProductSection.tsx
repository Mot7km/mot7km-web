'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Product } from '@/data/menu';
import { ProductCard } from '@/components/features/ProductCards';
import { ViewMoreButton, ThatsIt } from '@/components/ui/ViewMore';

interface ProductSectionProps {
  title?: string;
  products: Product[];
  initialCount?: number;
  loadMoreCount?: number;
  showCount?: boolean;
}

export default function ProductSection({
  title,
  products,
  initialCount = 4,
  loadMoreCount = 4,
  showCount = true,
}: ProductSectionProps) {
  const t = useTranslations();
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const hasMore = visibleCount < products.length;
  const visibleItems = products.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(initialCount);
  }, [products, initialCount]);

  const handleLoadMore = () => {
    setVisibleCount(Math.min(visibleCount + loadMoreCount, products.length));
  };

  // Empty state
  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-[var(--color-text-muted)]">
        <p className="text-sm">{t('productList.empty') || 'No products available'}</p>
      </div>
    );
  }

  const sectionTitle = title || t('productList.menu');

  return (
    <section className="flex flex-col gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex sm:flex-row sm:items-center justify-between gap-2">
        <h2
          className="accent-line font-bold text-2xl leading-8 text-[var(--color-text-primary)]"
          style={{ fontFamily: 'var(--font-display), var(--font-inter), system-ui, sans-serif' }}
        >
          {sectionTitle}
        </h2>
        <div className="flex items-center gap-3">
          {showCount && (
            <span className="badge-count">
              {t('productList.countOf', { count: visibleItems.length, total: products.length })}
            </span>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {visibleItems.map((product, index) => (
          <div
            key={product.id}
            className="w-full animate-fade-in-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <ProductCard product={product} />
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
    </section>
  );
}