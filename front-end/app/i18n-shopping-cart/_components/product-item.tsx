'use client';

import { ProductItem as ProductItemType } from '../_types/product';
import { AddToCart } from './add-to-cart';
import Image from 'next/image';
import React from 'react';

const displayName = 'ProductItem';

export const ProductItem = (props: ProductItemType) => {
  const { ...item } = props;

  const titleId = React.useId();

  return (
    <article
      aria-labelledby={titleId}
      className="bg-background overflow-hidden rounded"
    >
      <div className="relative aspect-video w-full select-none overflow-hidden">
        <Image
          src={item.image.thumbnail}
          alt={item.name}
          loader={({ width }) => {
            if (width < 768) return item.image.mobile;
            if (width >= 768 && width < 1024)
              return item.image.tablet;

            return item.image.desktop;
          }}
          fill
          placeholder="blur"
          blurDataURL={item.blurDataURL}
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <div className="flex items-center gap-3">
          <h2
            id={titleId}
            className="grow truncate text-lg first-letter:uppercase"
          >
            {item.name}
          </h2>

          <span
            aria-label="price"
            className="text-muted-12 shrink-0 text-lg font-medium"
          >
            $ {item.price}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-end gap-3">
          <div
            aria-label="category"
            className="bg-muted-3 shrink-0 rounded-full p-3 py-1 text-sm font-medium first-letter:uppercase"
          >
            {item.category}
          </div>

          <div className="grow"></div>

          <AddToCart id={item.id} name={item.name} />
        </div>
      </div>
    </article>
  );
};

ProductItem.displayName = displayName;
