'use client';

import { ProductItem as ProductItemType } from '../__types/product';
import { ProductImage } from './product-image';
import { AddToCart } from './add-to-cart';
import React from 'react';

interface ProductItemProps extends ProductItemType {}

const displayName = 'ProductItem';

export const ProductItem = (props: ProductItemProps) => {
  const { ...item } = props;

  const titleId = React.useId();

  return (
    <article aria-labelledby={titleId}>
      <div className="relative">
        <ProductImage {...item} />
        <AddToCart {...item} />
      </div>

      <div className="mt-7 space-y-1">
        <dl>
          <dt className="sr-only">category</dt>
          <dd className="inline-block leading-none text-foreground/85 first-letter:uppercase">
            {item.category}
          </dd>
        </dl>

        <h2
          id={titleId}
          className="truncate text-xl font-medium leading-none first-letter:uppercase"
        >
          {item.name}
        </h2>

        <dl>
          <dt className="sr-only">price</dt>
          <dd className="inline-block text-xl font-semibold text-primary-11">
            $ {item.price}
          </dd>
        </dl>
      </div>
    </article>
  );
};

ProductItem.displayName = displayName;
