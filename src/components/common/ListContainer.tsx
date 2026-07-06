'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n } from '@/config/i18n';
import { Product } from '@/data/menu';

interface ProductListProps {
  products: Product[];
  title: string;
  columns?: number;                 // 1, 2, 3, 4 – default 2
  initialVisible?: number;          // default 4
  loadMoreCount?: number;           // default 4
  featured?: boolean;               // true = large card, false = small card
  showCount?: boolean;              // display "x of y"
}

export default function ProductList({
  products,
  title,
  columns = 2,
  initialVisible = 4,
  loadMoreCount = 4,
  featured = false,
  showCount = true,
}: ProductListProps) {
  const pathname = usePathname();
  const [visibleCount, setVisibleCount] = useState(initialVisible);
  const hasMore = visibleCount < products.length;
  const visibleProducts = products.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(initialVisible);
  }, [products, initialVisible]);

  // Derive current locale from the URL pathname (always reliable)
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = (segments[0] && i18n.locales.includes(segments[0] as any))
    ? (segments[0] as typeof i18n.locales[number])
    : i18n.defaultLocale;

  const handleViewMore = () => {
    setVisibleCount(Math.min(visibleCount + loadMoreCount, products.length));
  };

  // Force columns=1 for featured view
  const gridCols = featured ? 1 : columns;

  // ---- Card rendering ----
  const renderCard = (product: Product) => {
    const href = `/${currentLocale}/${product.id}`;

    if (featured) {
      return (
        <Link
          key={product.id}
          href={href}
          prefetch={false}
          className="block w-full bg-[var(--color-surface)] rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden h-[340px] cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >
          <div className="w-full h-[192px] bg-[var(--color-card-light)] relative">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          </div>
          <div className="p-4 flex flex-col justify-between h-[148px]">
            <div>
              <h3 className="font-montserrat font-semibold text-xl leading-7 text-[var(--color-text-primary)]">
                {product.name}
              </h3>
              <p className="text-sm font-normal leading-5 text-[var(--color-text-secondary)] mt-1 line-clamp-2">
                {product.description}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-montserrat font-bold text-lg leading-6 text-[var(--color-primary)]">
                {product.price}
              </span>
              <div className="flex items-center gap-1">
                <span className="font-inter font-semibold text-sm leading-5 text-[var(--color-text-primary)]">
                  {product.rating}
                </span>
                <svg width="16.67" height="15.83" viewBox="0 0 17 16" fill="none">
                  <path
                    d="M8.335 0L10.267 5.147L16.67 5.882L11.67 10.529L12.677 16.765L8.335 14.118L3.993 16.765L5 10.529L0 5.882L6.403 5.147L8.335 0Z"
                    fill="var(--color-primary)"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      );
    }

    // Small card (default ProductGrid card)
    return (
      <Link
        key={product.id}
        href={href}
        prefetch={false}
        className="block bg-[var(--color-surface)] rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-md transition-shadow"
      >
        <div className="relative w-full aspect-[4/3] bg-[var(--color-card-light)]">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
        <div className="p-3">
          <h4 className="font-montserrat font-semibold text-base leading-6 text-[var(--color-text-primary)] line-clamp-1">
            {product.name}
          </h4>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="font-montserrat font-bold text-sm text-[var(--color-primary)]">
              {product.price}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-[var(--color-text-primary)]">{product.rating}</span>
              <svg width="14" height="14" viewBox="0 0 17 16" fill="none">
                <path
                  d="M8.335 0L10.267 5.147L16.67 5.882L11.67 10.529L12.677 16.765L8.335 14.118L3.993 16.765L5 10.529L0 5.882L6.403 5.147L8.335 0Z"
                  fill="var(--color-primary)"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <h2 className="font-montserrat font-semibold text-xl leading-7 text-[var(--color-text-primary)]">
          {title}
        </h2>
        <div className="flex items-center gap-3">
          {showCount && (
            <span className="text-xs text-[var(--color-text-muted)] opacity-60">
              {visibleProducts.length} of {products.length}
            </span>
          )}
        </div>
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <div className="flex min-h-32 items-center justify-center rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-8 text-center text-sm text-[var(--color-text-muted)]">
          No products match this search in the selected category.
        </div>
      ) : (
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          }}
        >
          {visibleProducts.map(renderCard)}
        </div>
      )}

      {/* Bottom: View More or That’s it! */}
      <div>
        {hasMore ? (
          <button
            onClick={handleViewMore}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-[var(--color-primary)] text-[var(--color-text-on-primary)] text-sm font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            <span>View More</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 10.5L3.5 6L4.5 5L8 8.5L11.5 5L12.5 6L8 10.5Z" fill="currentColor" />
            </svg>
          </button>
        ) : (
          products.length > 0 && (
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm text-[var(--color-text-muted)] opacity-70 font-inter">That’s it!</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}