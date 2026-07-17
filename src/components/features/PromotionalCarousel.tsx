'use client';

import Image from 'next/image';
import { Coffee, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';
import { promoCards, PromoCardData } from '@/data/menupromo';
import { usePathname } from 'next/navigation';

// -------------------------------------------------------------------
// Main Carousel – full‑width on mobile, container‑width on larger screens
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
    // Mobile: full‑width breakout (100vw) – Large screens: respect container (auto)
    <section
      className="relative overflow-hidden py-2
        w-screen left-1/2 -translate-x-1/2
        sm:w-auto sm:left-0 sm:translate-x-0"
    >
      <div className="relative">
        {/* Carousel Viewport */}
        <div>
          <div
            className="overflow-hidden rounded-2xl"
            ref={emblaRef}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className="flex">
              {promoCards.map((card) => (
                <div
                  key={card.id}
                  className="min-w-0 flex-shrink-0 flex-grow-0 basis-[88%] sm:basis-[80%] md:basis-[60%] lg:basis-[50%]
                    px-2 py-2 overflow-visible"
                >
                  <PromoCard {...card} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Arrows — hidden on mobile, visible on sm+ */}
        <button
          onClick={scrollPrev}
          className="absolute top-1/2 left-0 -translate-y-1/2 z-10
            hidden sm:flex items-center justify-center
            w-11 h-11 rounded-full
            glass
            text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]
            transition-all duration-200
            hover:scale-110 active:scale-95
            focus:outline-none focus-ring
            cursor-pointer"
          aria-label={isRTL ? 'التالي' : 'Previous'}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={scrollNext}
          className="absolute top-1/2 right-0 -translate-y-1/2 z-10
            hidden sm:flex items-center justify-center
            w-11 h-11 rounded-full
            glass
            text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]
            transition-all duration-200
            hover:scale-110 active:scale-95
            focus:outline-none focus-ring
            cursor-pointer"
          aria-label={isRTL ? 'السابق' : 'Next'}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="mt-5 flex justify-center gap-2">
          {promoCards.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-400 ease-out cursor-pointer
                ${
                  index === selectedIndex
                    ? 'w-7'
                    : 'w-2 bg-[var(--color-border-strong)] hover:bg-[var(--color-primary)]/40'
                }
              `}
              style={index === selectedIndex ? { background: 'var(--gradient-primary)' } : undefined}
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
      className="group relative h-[220px] sm:h-[240px] w-full overflow-hidden rounded-2xl
        border border-[var(--color-border)]
        transition-all duration-400 ease-out
        hover:border-[var(--color-primary)]/50
        cursor-pointer"
      style={{ boxShadow: 'var(--shadow-card)' }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card)'; e.currentTarget.style.transform = 'scale(1)'; }}
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
          {/* Depth overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 group-hover:from-black/20 transition-colors duration-400" />
        </>
      )}

      {/* No-image background */}
      {!image && (
        <div className="absolute inset-0 bg-[var(--color-card-light)] dark:bg-[var(--color-card-dark)]" />
      )}

      {/* Decorative Icon */}
      {hasIcon && (
        <div className="absolute bottom-0 right-0 opacity-[0.07] group-hover:opacity-[0.14] transition-opacity duration-400">
          <Coffee className="h-36 w-36 text-[var(--color-primary)]" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 py-5">
        {badge && (
          <span
            className="mb-3 inline-flex w-fit items-center rounded-full
              px-3 py-1 text-xs font-semibold tracking-wider uppercase
              bg-white/15 text-white/95
              backdrop-blur-sm border border-white/10"
          >
            {badge}
          </span>
        )}

        <h3
          className={`text-2xl sm:text-[1.7rem] font-bold leading-tight tracking-tight
            ${image ? 'text-white' : 'text-[var(--color-text-primary)]'}
          `}
          style={{ fontFamily: 'var(--font-display), var(--font-inter), system-ui, sans-serif' }}
        >
          {title}
        </h3>

        {description && (
          <p
            className={`mt-1.5 text-sm font-normal leading-5 max-w-sm
              ${image ? 'text-white/85' : 'text-[var(--color-text-muted)]'}
            `}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}