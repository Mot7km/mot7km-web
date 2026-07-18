'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Product } from '@/data/menu';
import { useLocale } from '@/hooks/useLocale';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale();
  const href = `/${locale}/${product.id}`;

  return (
    <Link
      href={href}
      prefetch={false}
      className="group relative flex flex-col w-full min-h-[280px]
        bg-[var(--color-surface)] rounded-2xl
        border border-[var(--color-border)]
        overflow-hidden
        transition-all duration-400 ease-out
        hover:border-[var(--color-primary)]/40
        active:scale-[0.98]"
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
      {/* Image container */}
      <div className="relative w-full h-44 bg-[var(--color-card-light)] dark:bg-[var(--color-card-dark)] overflow-hidden flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating price tag (glassmorphism) */}
        <div className="absolute bottom-3 end-3 z-10">
          <span
            className="inline-flex items-center px-3 py-1.5 rounded-xl
              bg-white/80 dark:bg-black/60 backdrop-blur-md
              border border-white/30 dark:border-white/10
              font-bold text-sm text-[var(--color-primary)]
              shadow-lg
              transition-all duration-300
              group-hover:shadow-[0_0_20px_rgba(22,131,199,0.25)]
              group-hover:scale-105"
          >
            {product.price}
          </span>
        </div>

        {/* Decorative gradient corner */}
        <div className="absolute top-0 start-0 w-20 h-20
          bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-500
          pointer-events-none" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-1.5">
        <h4
          className="font-bold text-base leading-6 text-[var(--color-text-primary)] line-clamp-1
            group-hover:text-[var(--color-primary)] transition-colors duration-300"
          style={{ fontFamily: 'var(--font-display), var(--font-inter), system-ui, sans-serif' }}
        >
          {product.name}
        </h4>
        <p className="text-xs leading-4 text-[var(--color-text-muted)] line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Bottom row – rating */}
        <div className="flex items-center justify-between mt-2 pt-2.5 border-t border-[var(--color-divider)]">
          {/* Category tag */}
          {product.category && (
            <span className="text-[10px] font-medium text-[var(--color-text-muted)]
              bg-[var(--color-card-light)] dark:bg-[var(--color-elevated-dark)]
              px-2.5 py-0.5 rounded-full truncate max-w-[100px]">
              {product.category}
            </span>
          )}

          {/* Rating badge */}
          <div className="flex items-center gap-1.5
            bg-[var(--color-primary-50)] px-2.5 py-1 rounded-full
            transition-all duration-300
            group-hover:shadow-[0_0_12px_rgba(22,131,199,0.15)]">
            <Star
              size={13}
              className="text-[var(--color-warning)] fill-[var(--color-warning)]"
              strokeWidth={0}
            />
            <span className="text-xs font-bold text-[var(--color-text-primary)] leading-none">
              {product.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}