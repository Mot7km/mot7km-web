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

  if (!products.length) return null;

  const sectionTitle = title || t('productList.menu');

  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-montserrat font-semibold text-xl leading-7 text-[var(--color-text-primary)]">
          {sectionTitle}
        </h2>
        {showCount && (
          <span className="text-xs text-[var(--color-text-muted)] opacity-60">
            {t('productList.countOf', { count: visibleItems.length, total: products.length })}
          </span>
        )}
      </div>

      {/* Grid container – replaces flex-wrap */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {visibleItems.map((product) => (
          <ProductCard key={product.id} product={product} />
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