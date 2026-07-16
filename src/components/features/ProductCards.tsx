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
      className="group flex flex-col w-full max-h-[260px]
        bg-[var(--color-surface)] rounded-xl
        border border-[var(--color-border)]
        overflow-hidden
        transition-all duration-350 ease-out
        hover:border-[var(--color-primary)]/50
        active:scale-[0.98]"
      style={{ boxShadow: 'var(--shadow-card)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Image container */}
      <div className="relative w-full h-30 bg-[var(--color-card-light)] dark:bg-[var(--color-card-dark)] overflow-hidden flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-600 ease-out group-hover:scale-108"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3.5 gap-1">
        <h4
          className="font-semibold text-base leading-6 text-[var(--color-text-primary)] line-clamp-1"
          style={{ fontFamily: 'var(--font-display), var(--font-inter), system-ui, sans-serif' }}
        >
          {product.name}
        </h4>
        <p className="text-xs leading-4 text-[var(--color-text-muted)] line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Bottom row – price on left, rating badge on right */}
        <div className="flex items-center justify-between mt-1.5 pt-2 border-t border-[var(--color-divider)]">
          {/* Price – left side */}
          <span className="font-bold text-sm text-[var(--color-primary)]">
            {product.price}
          </span>

          {/* Rating badge – right side (replaces the + button) */}
          <div className="flex items-center gap-1.5 bg-[var(--color-primary-50)] px-2.5 py-1 rounded-full">
            <Star
              size={14}
              className="text-[var(--color-warning)] fill-[var(--color-warning)]"
              strokeWidth={0}
            />
            <span className="text-xs font-semibold text-[var(--color-text-primary)] leading-none">
              {product.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}