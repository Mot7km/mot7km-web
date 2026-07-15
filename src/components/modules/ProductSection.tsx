'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Product } from '@/data/menu';
import { ProductCard } from '@/components/features/ProductCards';
import { ViewMoreButton, ThatsIt } from '@/components/ui/ViewMore';

interface ProductSectionProps {
  title?: string;
  products: Product[];
  initialCount?: number;      // default 4
  loadMoreCount?: number;     // default 4
  showCount?: boolean;        // default true
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {visibleItems.map((product, index) => (
          <div
            key={product.id}
            className="w-full transition-all duration-300 ease-out transform hover:scale-[1.03] hover:shadow-lg hover:shadow-[var(--color-primary)]/5"
            style={{
              animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`,
            }}
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

      {/* Animation keyframes – include in global CSS or use a <style> tag */}
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