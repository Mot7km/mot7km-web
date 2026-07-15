'use client';

import Image from 'next/image';
import { Coffee, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';
import { promoCards, PromoCardData } from '@/data/menupromo';
import { usePathname } from 'next/navigation';

// -------------------------------------------------------------------
// Main Carousel
// -------------------------------------------------------------------
export function PromotionalCarousel() {
  const pathname = usePathname();
  const isRTL = pathname?.startsWith('/ar') ?? false;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      containScroll: 'trimSnaps',
      dragFree: false,
      direction: isRTL ? 'rtl' : 'ltr',
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  return (
    <section className="w-full overflow-hidden py-4">
      <div className="relative">
        {/* Carousel Viewport – with horizontal padding for arrow space */}
        <div>
          <div
            className="overflow-hidden"
            ref={emblaRef}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className="flex">
              {promoCards.map((card) => (
                <div
                  key={card.id}
                  className="min-w-0 flex-shrink-0 flex-grow-0 basis-[85%] sm:basis-[80%] md:basis-[60%] lg:basis-[50%] 
                    px-2 py-2 overflow-visible" // 👈 allow card scale to show
                >
                  <PromoCard {...card} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Arrows – with more spacing */}
        <button
          onClick={scrollPrev}
          className="absolute top-1/2 left-0 -translate-y-1/2 z-10
            hidden sm:flex items-center justify-center
            w-12 h-12 rounded-full
            bg-[var(--color-surface)]/80 backdrop-blur-sm
            border border-[var(--color-border)]
            shadow-md hover:shadow-lg hover:border-[var(--color-primary)]
            text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50
            cursor-pointer"
          aria-label={isRTL ? 'التالي' : 'Previous'}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={scrollNext}
          className="absolute top-1/2 right-0 -translate-y-1/2 z-10
            hidden sm:flex items-center justify-center
            w-12 h-12 rounded-full
            bg-[var(--color-surface)]/80 backdrop-blur-sm
            border border-[var(--color-border)]
            shadow-md hover:shadow-lg hover:border-[var(--color-primary)]
            text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50
            cursor-pointer"
          aria-label={isRTL ? 'السابق' : 'Next'}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {promoCards.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ease-out cursor-pointer
                ${
                  index === selectedIndex
                    ? 'w-6 bg-[var(--color-primary)] shadow-sm shadow-[var(--color-primary)]/30'
                    : 'w-2 bg-[var(--color-border)] hover:bg-[var(--color-primary)]/50'
                }
              `}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Individual Promo Card
// -------------------------------------------------------------------
function PromoCard({
  title,
  description,
  badge,
  image,
  gradient,
  hasIcon,
}: PromoCardData) {
  const overlayGradient = gradient || 'var(--gradient-primary)';

  return (
    <div
      className="group relative h-[220px] w-full overflow-hidden rounded-xl
        border border-[var(--color-border)]
        shadow-sm hover:shadow-xl hover:shadow-[var(--color-primary)]/5
        hover:scale-[1.02] hover:border-[var(--color-primary)]
        transition-all duration-300 ease-out
        bg-[var(--color-surface)]
        cursor-pointer" // 👈 cursor pointer on card
    >
      {/* Image */}
      {image && (
        <>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 opacity-80"
            style={{ background: overlayGradient }}
          />
          {/* Additional dark overlay for contrast */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
        </>
      )}

      {/* Decorative Icon */}
      {hasIcon && (
        <div className="absolute bottom-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <Coffee className="h-32 w-32 text-[var(--color-primary)]" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center px-5 py-4">
        {badge && (
          <span
            className="mb-2 inline-flex w-fit items-center rounded-full 
              px-3 py-1 text-xs font-medium tracking-wide
              bg-[var(--color-primary)]/20 text-[var(--color-primary)]
              backdrop-blur-sm border border-[var(--color-primary)]/10"
          >
            {badge}
          </span>
        )}

        <h3
          className={`font-montserrat text-2xl font-bold leading-[30px] tracking-[-0.24px]
            ${image ? 'text-[var(--color-text-on-primary)]' : 'text-[var(--color-text-primary)]'}
          `}
        >
          {title}
        </h3>

        {description && (
          <p
            className={`mt-1 font-inter text-sm font-normal leading-5 max-w-sm
              ${image ? 'text-[var(--color-text-on-primary)]/90' : 'text-[var(--color-text-muted)]'}
            `}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}