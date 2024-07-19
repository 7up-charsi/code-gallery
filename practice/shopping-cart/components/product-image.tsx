'use client';

import { ProductItem } from '@/types/product';
import { useCart } from '@/zustand/cart';
import Image from 'next/image';
import React from 'react';

interface ProductImageProps extends ProductItem {}

const displayName = 'ProductImage';

export const ProductImage = (props: ProductImageProps) => {
  const { image, name, blurDataURL, id } = props;

  const item = useCart((state) => {
    return state.items.find((ele) => ele.id === id);
  });

  return (
    <div
      data-selected={!!item}
      className="relative aspect-video w-full select-none overflow-hidden rounded border-transparent data-[selected=true]:border-2 data-[selected=true]:border-primary-9 md:aspect-square"
    >
      <Image
        src={image.thumbnail}
        alt={name}
        loader={({ width }) => {
          if (width < 768) return image.mobile;
          if (width >= 768 && width < 1024) return image.tablet;

          return image.desktop;
        }}
        fill
        placeholder="blur"
        blurDataURL={blurDataURL}
        className="object-cover"
      />
    </div>
  );
};

ProductImage.displayName = displayName;
