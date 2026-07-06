'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Product } from '@/data/menu';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const locale = useLocale();

  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {products.map((product) => (
        <Link key={product.id} href={`/${locale}/${product.id}`}>
          <div className="bg-[#FCF9F8] rounded-xl shadow-[0_0_0_1px_rgba(227,191,178,0.2),0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden h-[225px] cursor-pointer hover:shadow-lg transition-shadow duration-300">
            {/* Image */}
            <div className="w-full h-[126.75px] bg-[#EBE7E7] relative">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            {/* Body */}
            <div className="p-3 flex flex-col justify-between h-[98px]">
              <div>
                <h3 className="text-sm font-semibold leading-5 text-[#1C1B1B]">{product.name}</h3>
                <p className="text-xs font-normal leading-[18px] text-[#5A4138]">{product.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-montserrat font-bold text-lg leading-6 text-[#1C1B1B]">
                  {product.price}
                </span>
                <div className="flex items-center gap-1">
                  <span className="font-sans font-semibold text-xs leading-4 text-[#1C1B1B]">
                    {product.rating}
                  </span>
                  <svg width="13.33" height="12.67" viewBox="0 0 13 13" fill="none" className="w-[13.33px] h-[12.67px]">
                    <path
                      d="M6.5 0L8.5309 4.11803L13 4.88197L9.75 8.02944L10.5609 12.382L6.5 10.25L2.43909 12.382L3.25 8.02944L0 4.88197L4.4691 4.11803L6.5 0Z"
                      fill="#A43700"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}