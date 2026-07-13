'use client';

import Image from 'next/image';
import { Coffee } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';
import { promoCards, PromoCardData } from '@/data/menupromo';
import { usePathname } from 'next/navigation'; // 👈 used to detect RTL

// -------------------------------------------------------------------
// Main Carousel
// -------------------------------------------------------------------
export function PromotionalCarousel() {
  // ----- Detect RTL from the URL path -----
  // Replace this logic with your own i18n detection if needed.
  // For example: useRouter().locale, useLocale() from next-intl, etc.
  const pathname = usePathname();
  const isRTL = pathname?.startsWith('/ar') ?? false; // adjust locale code as needed

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      containScroll: 'trimSnaps',
      dragFree: false,
      direction: isRTL ? 'rtl' : 'ltr', // 👈 key fix for RTL
    },
    [Autoplay({ delay: 2000, stopOnInteraction: true })]
  );

  // Update dots on slide change
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect(); // initialise

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollTo = (index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  };

  return (
    <section className="w-full overflow-hidden">
      <div className="relative">
        <div className="px-4 sm:px-6 md:px-8">
          <div
            className="overflow-hidden"
            ref={emblaRef}
            dir={isRTL ? 'rtl' : 'ltr'} // ensures correct flex direction
          >
            <div className="flex">
              {promoCards.map((card) => (
                <div
                  key={card.id}
                  className="min-w-0 flex-shrink-0 flex-grow-0 basis-[85%] sm:basis-[80%] md:basis-[60%] lg:basis-[50%] mx-2"
                >
                  <PromoCard {...card} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {promoCards.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === selectedIndex
                  ? 'w-4 bg-[var(--color-primary)]'
                  : 'w-2 bg-[var(--color-border)] hover:bg-[var(--color-primary)]'
              }`}
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
  textColor,
  badgeColor = 'text-white',
  badgeBg = 'rgba(0,0,0,0.5)',
  hasIcon,
}: PromoCardData) {
  return (
    <div
      className="relative h-[192px] w-full overflow-hidden rounded-xl border border-[var(--color-border)] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]"
      style={{
        background: image ? undefined : 'var(--color-surface)',
      }}
    >
      {image && (
        <>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: gradient }}
          />
        </>
      )}

      {hasIcon && (
        <div className="absolute bottom-0 right-0 opacity-20">
          <Coffee className="h-24 w-24 text-[var(--color-primary)]" />
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col justify-center px-4 py-4">
        {badge && (
          <div
            className="mb-2 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium tracking-[0.48px] backdrop-blur-sm"
            style={{
              background: badgeBg,
              color: badgeColor,
            }}
          >
            {badge}
          </div>
        )}

        <h3
          className={`font-montserrat text-2xl font-bold leading-[30px] tracking-[-0.24px] ${textColor}`}
        >
          {title}
        </h3>

        {description && (
          <p className={`mt-1 font-inter text-sm font-normal leading-5 ${textColor} opacity-90`}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}