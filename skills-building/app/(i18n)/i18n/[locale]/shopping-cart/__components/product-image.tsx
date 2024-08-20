'use client';

import { ProductItem } from '../__types/product';
import { useCart } from '../__zustand/cart';
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
      className="data-[selected=true]:border-primary-9 relative aspect-video w-full select-none overflow-hidden rounded border-transparent data-[selected=true]:border-2 md:aspect-square"
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
