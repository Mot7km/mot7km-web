'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag } from 'lucide-react';
import { Product } from '@/data/menu';
import { useLocale } from '@/hooks/useLocale';
import { useCart } from '@/context/CartContext';
import { useRef, useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
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

  return (
    <Link
      href={href}
      prefetch={false}
      className="group relative flex flex-col w-full h-full
        bg-[var(--color-surface)] rounded-2xl
        border border-[var(--color-border)]
        overflow-hidden
        transition-all duration-400 ease-out
        hover:border-[var(--color-primary)]/40
        active:scale-[0.98]
        cursor-pointer"
      style={{ boxShadow: 'var(--shadow-card)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div className="relative w-full aspect-[4/3] sm:aspect-[4/3] md:aspect-[4/3] bg-[var(--color-card-light)] dark:bg-[var(--color-card-dark)] overflow-hidden flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <button
          onClick={handleQuickAdd}
          disabled={isAdding}
          className={`absolute top-2 sm:top-3 end-2 sm:end-3 z-20 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md border border-[var(--color-border)] text-[var(--color-primary)] transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_15px_rgba(22,131,199,0.3)] hover:scale-110 active:scale-95 cursor-pointer ${
            isAdding ? 'opacity-50 pointer-events-none' : 'hover:bg-[var(--color-primary)] hover:text-white'
          }`}
          aria-label="Add to cart"
        >
          <ShoppingBag size={16} />
        </button>

        <div className="absolute bottom-2 sm:bottom-3 end-2 sm:end-3 z-10">
          <span className="inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl
            bg-white/80 dark:bg-black/60 backdrop-blur-md
            border border-white/30 dark:border-white/10
            font-bold text-xs sm:text-sm text-[var(--color-primary)]
            shadow-lg
            transition-all duration-300
            group-hover:shadow-[0_0_20px_rgba(22,131,199,0.25)]
            group-hover:scale-105">
            {product.price}
          </span>
        </div>

        <div className="absolute top-0 start-0 w-20 h-20
          bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-500
          pointer-events-none" />
      </div>

      <div className="flex flex-col flex-1 p-3 sm:p-4 gap-1.5">
        <h4 className="font-bold text-sm sm:text-base leading-tight sm:leading-6 text-[var(--color-text-primary)] line-clamp-1
          group-hover:text-[var(--color-primary)] transition-colors duration-300"
          style={{ fontFamily: 'var(--font-display), var(--font-inter), system-ui, sans-serif' }}>
          {product.name}
        </h4>
        <p className="text-xs leading-tight sm:leading-4 text-[var(--color-text-muted)] line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2 sm:pt-2.5 border-t border-[var(--color-divider)]">
          {product.category && (
            <span className="text-[10px] font-medium text-[var(--color-text-muted)]
              bg-[var(--color-card-light)] dark:bg-[var(--color-elevated-dark)]
              px-2 py-0.5 rounded-full truncate max-w-[80px] sm:max-w-[100px]">
              {product.category}
            </span>
          )}
          <div className="flex items-center gap-1.5
            bg-[var(--color-primary-50)] px-2 py-0.5 sm:py-1 rounded-full
            transition-all duration-300
            group-hover:shadow-[0_0_12px_rgba(22,131,199,0.15)]">
            <Star size={12} className="text-[var(--color-warning)] fill-[var(--color-warning)]" strokeWidth={0} />
            <span className="text-xs font-bold text-[var(--color-text-primary)] leading-none">
              {product.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}