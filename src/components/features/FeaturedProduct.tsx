'use client';

import Image from 'next/image';

export interface FeaturedProductData {
  id: string;
  name: string;
  description: string;
  price: string;
  rating: string;
  image: string;
}

interface FeaturedProductProps {
  product: FeaturedProductData;
  onSeeAll?: () => void;
}

export default function FeaturedProduct({ product, onSeeAll }: FeaturedProductProps) {
  return (
    <section className="flex flex-col items-start px-5 pb-4 gap-4 w-full max-w-[390px]">
      <div className="flex justify-between items-center w-full">
        <h2 className="font-montserrat font-semibold text-xl leading-7 text-[#1C1B1B]">
          Best Seller
        </h2>
      </div>

      {/* Bento-style large card */}
      <div className="w-full bg-[#FCF9F8] rounded-xl shadow-[0_0_0_1px_rgba(227,191,178,0.2),0_4px_20px_rgba(164,55,0,0.08)] overflow-hidden h-[340px] cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <div className="w-full h-[192px] bg-[#EBE7E7] relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col justify-between h-[148px]">
          <div>
            <h3 className="font-montserrat font-semibold text-xl leading-7 text-[#1C1B1B]">
              {product.name}
            </h3>
            <p className="text-sm font-normal leading-5 text-[#5A4138] mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Price + Rating */}
          <div className="flex justify-between items-center">
            <span className="font-montserrat font-bold text-lg leading-6 text-[#A43700]">
              {product.price}
            </span>
            <div className="flex items-center gap-1">
              <span className="font-inter font-semibold text-sm leading-5 text-[#1C1B1B]">
                {product.rating}
              </span>
              <svg
                width="16.67"
                height="15.83"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[16.67px] h-[15.83px]"
              >
                <path
                  d="M8.335 0L10.267 5.147L16.67 5.882L11.67 10.529L12.677 16.765L8.335 14.118L3.993 16.765L5 10.529L0 5.882L6.403 5.147L8.335 0Z"
                  fill="#A43700"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}