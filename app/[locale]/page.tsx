'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { PromotionalCarousel } from '@/components/features/PromotionalCarousel';
import Categories from '@/components/features/PromotionalCategories';
import ListContainer from '@/components/common/ListContainer';
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
    return [
      { id: 'All', label: t('common.all') },
      ...derivedCategories.map((category) => ({ id: category, label: category })),
    ];
  }, [t]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;
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

  // Build sections for ListContainer
  const sections = useMemo(() => {
    const result = [];
    if (featuredProducts.length > 0) {
      result.push({
        type: 'featured' as const,
        title: t('home.bestSeller'),
        data: featuredProducts,
      initialCount: 1,
      loadMoreCount: 1,
      showCount: true,
      });
    }
    result.push({
      type: 'products' as const,
      title: t('home.exploreItems'),
      data: gridProducts,
      initialCount: 4,
      loadMoreCount: 4,
      showCount: true,
    });
    return result;
  }, [featuredProducts, gridProducts, t]);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* PROMOTIONAL CAROUSEL */}
      <section className="w-full border-b border-[var(--color-border)] bg-[var(--color-background)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl md:max-w-6xl">
          <h2 className="mb-6 text-2xl font-bold text-[var(--color-text-primary)]">
            {t('home.specialOffers')}
          </h2>
          <PromotionalCarousel />
        </div>
      </section>

      {/* CATEGORIES & SEARCH */}
      <section className="w-full bg-[var(--color-background)] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl flex-col justify-center items-center">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <Categories categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />
        </div>
      </section>

      {/* PRODUCT SECTIONS */}
      <section className="w-full bg-[var(--color-background)] px-4 sm:px-6 lg:px-8 mb-4">
        <div className="mx-auto max-w-5xl md:max-w-6xl">
          <ListContainer sections={sections} />
        </div>
      </section>
    </div>
  );
}