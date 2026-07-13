'use client';

import Image from 'next/image';
import Link from 'next/link';
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
      className="flex-1 w-full
        bg-[var(--color-surface)] rounded-xl
        shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_4px_20px_rgba(0,0,0,0.06)]
        overflow-hidden h-[340px] cursor-pointer hover:shadow-lg transition-shadow duration-300"
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
      className="flex-1 min-w-[160px] max-w-[280px] sm:max-w-[300px] md:max-w-[240px] lg:max-w-[280px] xl:max-w-[320px]
        bg-[var(--color-surface)] rounded-xl
        shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)]
        overflow-hidden hover:shadow-md transition-shadow
        flex flex-col h-60 sm:h-64"
    >
      <div className="relative w-full flex-1 bg-[var(--color-card-light)]">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
      </div>
      <div className="p-3 flex flex-col justify-between flex-shrink-0">
        <div>
          <h4 className="font-montserrat font-semibold text-base leading-6 text-[var(--color-text-primary)] line-clamp-1">
            {product.name}
          </h4>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-montserrat font-bold text-sm text-[var(--color-primary)]">
            {product.price}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-[var(--color-text-primary)]">
              {product.rating}
            </span>
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
}