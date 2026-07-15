'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Product } from '@/data/menu';
import { useLocale } from '@/hooks/useLocale';

interface FeaturedCardProps {
  product: Product;
}

export function FeaturedCard({ product }: FeaturedCardProps) {
  const locale = useLocale();
  const href = `/${locale}/${product.id}`;

  return (
    <Link
      href={href}
      prefetch={false}
      className="group flex flex-col w-full min-h-[340px]
        bg-[var(--color-surface)] rounded-xl
        border border-[var(--color-border)]
        shadow-sm hover:shadow-xl hover:shadow-[var(--color-primary)]/5
        hover:border-[var(--color-primary)] hover:scale-[1.01]
        transition-all duration-300 ease-out
        active:scale-[0.98]
        overflow-hidden"
    >
      {/* Image container */}
      <div className="relative w-full h-48 bg-[var(--color-card-light)] dark:bg-[var(--color-card-dark)] overflow-hidden flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-1 min-h-[148px]">
        <h3 className="font-montserrat font-semibold text-xl leading-7 text-[var(--color-text-primary)] line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm font-normal leading-5 text-[var(--color-text-muted)] line-clamp-2 flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--color-border)]">
          <span className="font-montserrat font-bold text-lg leading-6 text-[var(--color-primary)]">
            {product.price}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="font-inter font-semibold text-sm leading-5 text-[var(--color-text-primary)]">
              {product.rating}
            </span>
            <Star
              size={16}
              className="text-[var(--color-warning)] fill-[var(--color-warning)]"
              strokeWidth={2}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

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
      className="group flex flex-col w-full min-h-[240px]
        bg-[var(--color-surface)] rounded-xl
        border border-[var(--color-border)]
        shadow-sm hover:shadow-lg hover:shadow-[var(--color-primary)]/5
        hover:border-[var(--color-primary)] hover:scale-[1.02]
        transition-all duration-300 ease-out
        active:scale-[0.98]
        overflow-hidden"
    >
      {/* Image container */}
      <div className="relative w-full h-40 bg-[var(--color-card-light)] dark:bg-[var(--color-card-dark)] overflow-hidden flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 gap-0.5">
        <h4 className="font-montserrat font-semibold text-base leading-6 text-[var(--color-text-primary)] line-clamp-1">
          {product.name}
        </h4>
        <p className="text-xs leading-4 text-[var(--color-text-muted)] line-clamp-2 flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-1 pt-1.5 border-t border-[var(--color-border)]">
          <span className="font-montserrat font-bold text-sm text-[var(--color-primary)]">
            {product.price}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-[var(--color-text-primary)]">
              {product.rating}
            </span>
            <Star
              size={14}
              className="text-[var(--color-warning)] fill-[var(--color-warning)]"
              strokeWidth={2}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}