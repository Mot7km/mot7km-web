'use client';

interface Category {
  id: string;
  label: string;
}

interface CategoriesProps {
  categories: Category[];
  activeCategory: string;
  onChange: (category: string) => void;
}

export default function Categories({ categories, activeCategory, onChange }: CategoriesProps) {
  return (
    <div className="w-full py-3 pb-6">
      <div className="flex w-full justify-start md:justify-center overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x">
        <div className="flex items-center gap-3 sm:gap-3 h-11 sm:h-10 px-1 min-w-max">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => onChange(category.id)}
                className={`
                  relative flex items-center justify-center 
                  px-4 sm:px-4 py-2 sm:py-2 h-9 sm:h-8 
                  rounded-full 
                  text-xs sm:text-xs font-medium tracking-[0.48px] sm:tracking-[0.48px] 
                  leading-4 sm:leading-4 
                  whitespace-nowrap
                  cursor-pointer
                  transition-all duration-300 ease-out
                  hover:scale-105 active:scale-95
                  flex-shrink-0
                  ${
                    isActive
                      ? 'bg-[var(--color-primary)] text-[var(--color-text-on-primary)] shadow-[var(--color-primary)]/30'
                      : 'bg-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-strong)] hover:shadow-sm'
                  }
                `}
              >
                {category.label}
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-[var(--color-primary)] opacity-20 blur-sm -z-10 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}