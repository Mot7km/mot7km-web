'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { allProducts } from '@/data/menu';
import { CustomizationOptions } from '@/components/features/CustomizationOptions';
import ListContainer from '@/components/common/ListContainer';
import { ArrowLeft, Sparkles, Star, ShoppingBag } from 'lucide-react';
import { use, useMemo, useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function ProductPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  // Use `use()` to unwrap the Promise
  const resolvedParams = use(params);
  const { locale, id } = resolvedParams;
  const t = useTranslations();
  const { addToCart, setIsDrawerOpen } = useCart();
  
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [extraTotal, setExtraTotal] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  
  const product = useMemo(() => allProducts.find((p) => p.id === id), [id]);

  if (!product) {
    notFound();
  }

  // Build review section if reviews exist
  const reviewSections = useMemo(() => {
    return product.reviews && product.reviews.length > 0
      ? [
          {
            type: 'reviews' as const,
            data: product.reviews,
          },
        ]
      : [];
  }, [product.reviews]);

  return (
    <div className="relative min-h-screen pb-32 overflow-x-clip">
      {/* ── Background Floating Orbs ── */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary)]/10 blur-[100px] rounded-full pointer-events-none animate-orb-1 -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-accent)]/10 blur-[80px] rounded-full pointer-events-none animate-orb-2 -z-10" />

      {/* ── Hero Image Section (Fixed Background) ── */}
      <div className="fixed top-0 left-0 w-full h-[45vh] sm:h-[50vh] md:h-[55vh] xl:h-[60vh] -z-20">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          priority
          className="object-cover" 
        />
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
      </div>

      {/* Glassmorphism Back Button (Scrolls up naturally) */}
      <div className="absolute top-6 left-4 sm:left-6 lg:left-8 z-30">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center w-10 h-10 sm:w-auto sm:px-4 sm:h-10 
              rounded-full glass-strong shadow-lg
              text-[var(--color-text-primary)] hover:text-[var(--color-primary)]
              transition-all duration-300 hover:scale-105 active:scale-95 group"
          >
            <ArrowLeft size={20} className="sm:mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline font-medium text-sm">
              {t('productPage.backToMenu')}
            </span>
          </Link>
        </div>

      {/* ── Content Sheet Container ── */}
      <div className="relative z-10 w-full min-h-[70vh] bg-[var(--color-background)] mt-[38vh] sm:mt-[42vh] md:mt-[48vh] xl:mt-[52vh] rounded-t-[2rem] sm:rounded-t-[3rem] shadow-[0_-12px_40px_rgba(0,0,0,0.15)] pt-8 sm:pt-10 md:pt-12 pb-12 px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto">
          {/* Main Content Card */}
          <div className="card-premium p-6 sm:p-8 md:p-10 space-y-8 animate-slide-up bg-[var(--color-surface)]">
          
          {/* HEADER */}
          <div className="flex flex-col gap-4">
            
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1 min-w-[200px]">
                {/* Category Badge */}
                {product.category && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 animate-fade-in stagger-1">
                    <Sparkles size={12} className="text-[var(--color-primary)]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                      {product.category}
                    </span>
                  </div>
                )}
                
                <h1 className="font-montserrat text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] leading-tight tracking-tight animate-fade-in stagger-2">
                  {product.name}
                </h1>
                
                {/* Rating (if any) */}
                {product.rating && (
                  <div className="flex items-center gap-2 mt-3 animate-fade-in stagger-3">
                    <div className="flex items-center bg-[var(--color-warning)]/10 px-2 py-1 rounded-full">
                      <Star size={14} className="text-[var(--color-warning)] fill-[var(--color-warning)] mr-1" />
                      <span className="text-sm font-bold text-[var(--color-text-primary)]">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Tag */}
              <div className="flex-shrink-0 animate-fade-in-up stagger-3">
                <div className="relative group cursor-default">
                  <div className="absolute -inset-1 rounded-2xl opacity-75 blur-md bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow" />
                  <div className="relative px-6 py-3 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-xl flex items-center justify-center">
                    <span className="gradient-text font-montserrat font-black text-3xl md:text-4xl tracking-tight">
                      {product.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed max-w-3xl animate-fade-in stagger-4">
              {product.description}
            </p>
          </div>

          {/* DIVIDER */}
          <div className="section-divider-premium animate-fade-in stagger-5" />

          {/* INGREDIENTS */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="space-y-4 animate-fade-in-up stagger-6">
              <h3 className="font-montserrat font-bold text-lg sm:text-xl text-[var(--color-text-primary)] flex items-center gap-2">
                <div className="w-1.5 h-6 rounded-full bg-[var(--color-primary)]" />
                {t('productPage.ingredients')}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {product.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="glass-subtle px-4 py-2 rounded-full text-sm font-medium 
                      text-[var(--color-text-primary)] shadow-sm hover:shadow-md hover:scale-105 
                      transition-all duration-300 border-[var(--color-border)]"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CUSTOMIZATION */}
          {product.customizationOptions && product.customizationOptions.length > 0 && (
            <div className="pt-2 animate-fade-in-up stagger-7">
              <CustomizationOptions 
                product={product} 
                onSelectionsChange={setSelections}
                onPriceChange={(total, extras) => setExtraTotal(extras)}
              />
            </div>
          )}

          {/* REVIEWS */}
          {reviewSections.length > 0 && (
            <div className="pt-6 animate-fade-in-up stagger-8">
              <ListContainer sections={reviewSections} />
            </div>
          )}
        </div>
      </div>
    </div>
      
    {/* ── Sticky Bottom Add To Cart Bar ── */}
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-surface)]/90 backdrop-blur-xl border-t border-[var(--color-border)] p-4 sm:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] animate-slide-up">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[var(--color-text-secondary)] text-sm font-medium">{t('productPage.total') || 'الإجمالي'}</span>
            <span className="font-montserrat font-bold text-2xl text-[var(--color-text-primary)]">
              ${((parseFloat(product.price.replace('$', '')) + extraTotal) * quantity).toFixed(2)}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-[var(--color-background)] rounded-full border border-[var(--color-border)] p-1">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-surface)] text-[var(--color-text-primary)] transition-colors"
              >
                -
              </button>
              <span className="font-bold text-sm min-w-[1.5rem] text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-surface)] text-[var(--color-text-primary)] transition-colors"
              >
                +
              </button>
            </div>
            
            <button 
              onClick={() => {
                addToCart(product, selections, quantity);
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white px-6 py-3 rounded-full font-bold shadow-[0_4px_15px_rgba(22,131,199,0.3)] hover:scale-105 active:scale-95 transition-all"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline">{t('productPage.addToCart') || 'أضف للسلة'}</span>
              <span className="sm:hidden">{t('productPage.add') || 'إضافة'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}