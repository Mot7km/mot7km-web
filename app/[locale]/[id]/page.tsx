import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { allProducts } from '@/data/menu';
import { CustomizationOptions } from '@/components/features/CustomizationOptions';
import ListContainer from '@/components/common/ListContainer';

export async function generateStaticParams() {
  const locales = ['en', 'ar'];
  const paths = [];
  for (const locale of locales) {
    for (const product of allProducts) {
      paths.push({ locale, id: product.id });
    }
  }
  return paths;
}

export default async function ProductPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const t = await getTranslations();
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  // Build review section if reviews exist
  const reviewSections = product.reviews && product.reviews.length > 0
    ? [
        {
          type: 'reviews' as const,
          data: product.reviews,
          // optionally set a title; fallback to translation inside ReviewSection
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-6 md:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] mb-4 md:mb-6 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M15 10H5M5 10L9 14M5 10L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t('productPage.backToMenu')}
        </Link>

        {/* Product Detail Card */}
        <div className="bg-[var(--color-surface)] rounded-2xl shadow-xl overflow-hidden">
          {/* Image */}
          <div className="w-full h-64 sm:h-80 md:h-[400px] bg-[var(--color-border)] relative">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          </div>

          <div className="p-5 sm:p-6 md:p-8 space-y-5 md:space-y-6">
            {/* HEADER */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3">
                <h1 className="font-montserrat text-3xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] leading-[40px] sm:leading-tight tracking-[-0.64px] sm:tracking-normal">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3">
                  <span className="sm:hidden font-montserrat font-bold text-xl text-[var(--color-primary)] leading-6">
                    {product.price}
                  </span>
                  <div className="hidden sm:block bg-[var(--color-primary)] text-[var(--color-text-on-primary)] px-5 py-2 rounded-full shadow-[var(--color-primary)]/20 shadow-md">
                    <span className="font-montserrat font-bold text-2xl md:text-3xl tracking-tight">
                      {product.price}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed md:leading-relaxed max-w-2xl">
                {product.description}
              </p>

              {product.category && (
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-xs font-medium bg-[var(--color-border)] px-3 py-1 rounded-full text-[var(--color-text-secondary)] border border-[var(--color-border-strong)]">
                    {product.category}
                  </span>
                </div>
              )}
            </div>

            {/* INGREDIENTS */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-montserrat font-semibold text-lg sm:text-xl text-[var(--color-text-primary)]">
                  {t('productPage.ingredients')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="bg-[var(--color-border)] px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-[0.48px] text-[var(--color-text-secondary)] border border-[var(--color-border-strong)]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CUSTOMIZATION */}
            {product.customizationOptions && product.customizationOptions.length > 0 && (
              <div className="space-y-4">
                <CustomizationOptions product={product} />
              </div>
            )}

            {/* REVIEWS */}
            {reviewSections.length > 0 && (
              <div className="pt-2">
                <ListContainer sections={reviewSections} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}