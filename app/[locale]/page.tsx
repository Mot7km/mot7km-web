'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { PromotionalCarousel } from '@/components/features/PromotionalCarousel';
import Categories from '@/components/features/PromotionalCategories';
import ProductList from '@/components/common/ListContainer';
import SearchBar from '@/components/common/SearchBar';
import { allProducts } from '@/data/menu';

export default function Home() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const derivedCategories = Array.from(
      new Set(allProducts.map((product) => product.category).filter(Boolean) as string[]),
    );

    return [{ id: 'All', label: 'All' }, ...derivedCategories.map((category) => ({ id: category, label: category }))];
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;

      if (!matchesCategory) {
        return false;
      }
      
      if (!normalizedQuery) {
        return true;
      }

      const haystack = [
        product.name,
        product.description,
        product.category,
        ...(product.ingredients ?? []),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [activeCategory, normalizedQuery]);

  const featuredProducts = filteredProducts.filter((product) => product.featured);
  const gridProducts = filteredProducts.filter((product) => !product.featured);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* PROMOTIONAL CAROUSEL */}
      <section className="w-full border-b border-[var(--color-border)] bg-[var(--color-background)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl md:max-w-6xl">
          <h2 className="mb-6 text-2xl font-bold text-[var(--color-text-primary)]">
            Special Offers
          </h2>
          <PromotionalCarousel />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="w-full bg-[var(--color-background)] px-4  sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl flex-col justify-center items-center">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <Categories categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      {featuredProducts.length > 0 && (
        <section className="w-full bg-[var(--color-background)] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl md:max-w-6xl">
            <ProductList
              products={featuredProducts}
              title="Best Seller"
              initialVisible={1}
              loadMoreCount={1}
              featured
            />
          </div>
        </section>
      )}

      {/* REGULAR PRODUCTS */}
      <section className="w-full border-b border-[var(--color-border)] bg-[var(--color-background)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl md:max-w-6xl">
          <ProductList
            products={gridProducts}
            title="Explore Items"
            initialVisible={4}
            loadMoreCount={4}
          />
        </div>
      </section>
    </div>
  );
}