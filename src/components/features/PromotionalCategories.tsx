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
    <div className="relative w-full">
      {/* Centering wrapper */}
      <div className="flex justify-center">
        {/* Scrollable container – auto‑sized, but limited to 100% width */}
        <div
          className="
            flex flex-nowrap gap-2 sm:gap-3 md:gap-4
            overflow-x-auto
            justify-start
            py-4 sm:py-5
            px-4 sm:px-6 md:px-8
            max-w-full
            scrollbar-hide
            snap-x snap-mandatory
            touch-pan-x
          "
          style={{
            flex: '0 0 auto',
            scrollSnapType: 'x mandatory',
            scrollPaddingLeft: '1rem',
            scrollPaddingRight: '1rem',
          }}
        >
          {categories.map((category) => {
            const isActive = category.id === activeCategory;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className="
                  group flex flex-col items-center gap-1.5 sm:gap-2
                  snap-center shrink-0
                  transition-all duration-300 ease-out
                  cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60
                  active:scale-95
                "
                aria-pressed={isActive}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Circular avatar */}
                <div
                  className={`
                    relative
                    w-12 h-12
                    sm:w-14 sm:h-14
                    md:w-16 md:h-16
                    lg:w-20 lg:h-20
                    rounded-full
                    transition-all duration-300 ease-out
                    ${
                      isActive
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg shadow-primary/20 scale-110'
                        : 'ring-1 ring-border/50 group-hover:ring-primary/40 group-hover:scale-105 shadow-sm'
                    }
                  `}
                >
                  <Image
                    src={category.image}
                    alt={category.label}
                    fill
                    sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, (max-width: 1024px) 64px, 80px"
                    className="object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                    priority={isActive}
                  />
                </div>

                {/* Label */}
                <span
                  className={`
                    text-[10px] xs:text-xs sm:text-sm font-semibold leading-tight
                    transition-colors duration-200
                    max-w-[72px] truncate text-center
                    ${
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground group-hover:text-foreground'
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
    </div>
  );
}