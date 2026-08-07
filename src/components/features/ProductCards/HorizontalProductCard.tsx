'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag, Settings2, ChevronRight } from 'lucide-react';
import { Product } from '@/data/menu';
import { useLocale } from '@/hooks/useLocale';
import { useCart } from '@/context/CartContext';
import { useRef, useState } from 'react';

interface HorizontalProductCardProps {
  product: Product;
}

export function HorizontalProductCard({ product }: HorizontalProductCardProps) {
  const locale = useLocale();
  const href = `/${locale}/${product.id}`;
  const { addToCart, setIsDrawerOpen } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const addTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAdding) return;
    setIsAdding(true);

    const defaults: Record<string, string> = {};
    if (product.customizationOptions) {
      for (const opt of product.customizationOptions) {
        if (opt.defaultChoice) defaults[opt.name] = opt.defaultChoice;
        else if (opt.choices.length > 0) defaults[opt.name] = opt.choices[0].label;
      }
    }

    addToCart(product, defaults, 1);

    if (addTimeoutRef.current) clearTimeout(addTimeoutRef.current);
    addTimeoutRef.current = setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const reviewCount = product.reviews?.length || 0;

  return (
    <Link
      href={href}
      prefetch={false}
      className="group relative flex flex-row w-full h-36 sm:h-44 md:h-52
        bg-[var(--color-surface)] rounded-2xl
        border border-[var(--color-border)]
        overflow-hidden
        transition-all duration-400 ease-out
        hover:border-[var(--color-primary)]/40
        active:scale-[0.98]
        cursor-pointer
        shadow-[var(--shadow-card)]
        hover:shadow-[var(--shadow-card-hover)]
        hover:translate-y-[-4px]"
    >
      {/* Image Section – fixed 40% width, fills height */}
      <div className="relative w-2/5 h-full flex-shrink-0 bg-[var(--color-card-light)] dark:bg-[var(--color-card-dark)] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 40vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category badge – visible only on small screens */}
        {product.category && (
          <div className="absolute top-2 sm:top-3 end-2 sm:end-3 z-10 block sm:hidden">
            <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-xl
              bg-white/80 dark:bg-black/60 backdrop-blur-md
              border border-white/30 dark:border-white/10
              font-medium text-xs sm:text-sm md:text-base text-[var(--color-text-primary)]
              shadow-lg
              transition-all duration-300
              group-hover:shadow-[0_0_20px_rgba(22,131,199,0.25)]
              group-hover:scale-105">
              {product.category}
            </span>
          </div>
        )}

        {/* Quick Add button */}
        <button
          onClick={handleQuickAdd}
          disabled={isAdding}
          className={`absolute bottom-2 sm:bottom-3 end-2 sm:end-3 z-20 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md border border-[var(--color-border)] text-[var(--color-primary)] transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_15px_rgba(22,131,199,0.3)] hover:scale-110 active:scale-95 ${
            isAdding ? 'opacity-50 pointer-events-none' : 'hover:bg-[var(--color-primary)] hover:text-white'
          }`}
          aria-label="Add to cart"
        >
          <ShoppingBag size={16} className="sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* Info Section – clean stacked layout, reduced padding */}
      <div className="flex flex-col flex-1 p-2.5 sm:p-4 md:p-5 justify-between min-w-0 gap-1 sm:gap-1.5">
        {/* Row 1: Product name + Category (on large screens) */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center flex-wrap gap-2 min-w-0">
            <h4 className="font-bold text-sm sm:text-base md:text-lg text-[var(--color-text-primary)] leading-tight
              group-hover:text-[var(--color-primary)] transition-colors duration-300 line-clamp-2"
              style={{ fontFamily: 'var(--font-display), var(--font-inter), system-ui, sans-serif' }}>
              {product.name}
            </h4>
          </div>
          {/* Category badge – visible on medium and up, placed next to name */}
          {product.category && (
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-xl
            bg-white/80 dark:bg-black/60 backdrop-blur-md
            border border-white/30 dark:border-white/10
            font-medium text-xs sm:text-sm text-[var(--color-text-primary)]
            shadow-sm
            transition-all duration-300
            group-hover:shadow-[0_0_20px_rgba(22,131,199,0.25)]
            group-hover:scale-105
            whitespace-nowrap">
            {product.category}
            </span>
          )}
        </div>

        {/* Row 2: Description */}
        {product.description && (
          <p className="text-xs sm:text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed ">
            {product.description}
          </p>
        )}

        {/* Row 3: Price + Rating (replaces options count) and View details */}
        <div className="flex items-center justify-between pt-1 border-t border-[var(--color-divider)]">
          {/* Left: Price and Rating together */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Rating */}
            <div className="flex items-center gap-1 bg-[var(--color-primary-50)] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full
              transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(22,131,199,0.15)]">
              <Star size={12} className="sm:w-3.5 sm:h-3.5 text-[var(--color-warning)] fill-[var(--color-warning)]" strokeWidth={0} />
              <span className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)] leading-none">
                {product.rating}
              </span>
              {reviewCount > 0 && (
                <span className="text-[10px] sm:text-xs text-[var(--color-text-muted)] ml-0.5">
                  ({reviewCount})
                </span>
              )}
            </div>
            {/* Price */}
            <span className="font-bold text-sm sm:text-base md:text-lg text-[var(--color-primary)]">
              {product.price}
            </span>
          </div>

          {/* Right: View details */}
          <div className="flex items-center text-xs sm:text-sm text-[var(--color-text-muted)] opacity-60 group-hover:opacity-100 transition-opacity">
            <span className="hidden sm:inline">View details</span>
            <ChevronRight size={16} className="sm:w-4 sm:h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}