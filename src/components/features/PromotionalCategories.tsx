'use client';

import Image from 'next/image';

interface Category {
  id: string;
  label: string;
  image: string;
}

interface CategoriesProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function Categories({
  categories,
  activeCategory,
  onSelectCategory,
}: CategoriesProps) {
  return (
    <div className="relative w-full overflow-hidden mb-6">
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x px-4 sm:px-6 md:px-8">
        {categories.map((category) => {
          const isActive = category.id === activeCategory;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`
                group flex flex-col items-center gap-2 snap-center shrink-0
                transition-all duration-300 ease-out cursor-pointer
              `}
              aria-pressed={isActive}
            >
              {/* Circular Avatar */}
              <div
                className={`
                  relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden p-[2px]
                  transition-all duration-300 ease-out
                  ${isActive
                    ? 'bg-[var(--gradient-primary)] shadow-[var(--shadow-glow)] scale-110'
                    : 'bg-[var(--color-surface)] border border-[var(--color-border)] group-hover:border-[var(--color-primary)]/50 group-hover:scale-105 shadow-sm'
                  }
                `}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden bg-[var(--color-background)]">
                  <Image
                    src={category.image}
                    alt={category.label}
                    fill
                    sizes="(max-width: 640px) 64px, 80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
              
              {/* Label */}
              <span
                className={`
                  text-xs sm:text-sm font-semibold transition-colors duration-200
                  ${isActive
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]'
                  }
                `}
              >
                {category.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}