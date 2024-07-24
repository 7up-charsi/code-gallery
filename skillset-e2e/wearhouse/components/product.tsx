import { Product as ProductType } from '@/types/product';
import Image from 'next/image';
import React from 'react';

interface ProductProps extends ProductType {}

const displayName = 'Product';

export const Product = (props: ProductProps) => {
  const { thumbnail, title, price, discountPercentage } = props;

  return (
    <article>
      <div className="relative aspect-square w-[220px] overflow-hidden rounded-xl bg-muted-4">
        <Image
          src={thumbnail}
          alt="thumbnail"
          fill
          className="select-none"
        />
      </div>

      <h3 className="mt-3 truncate font-bold text-black">{title}</h3>
      {/* TODO: add rating */}

      <dl className="flex items-center">
        <dt className="sr-only">price</dt>
        <dd className="mt-1 text-xl font-bold text-black">
          ${price}
        </dd>

        {discountPercentage && (
          <>
            <dt className="sr-only">original price</dt>
            <dd className="ml-2 mt-1 text-xl font-bold text-black/40">
              <del>
                ${(price / (1 - discountPercentage / 100)).toFixed(2)}
              </del>
            </dd>

            <dt className="sr-only">discount Percentage</dt>

            <dd className="ml-2 content-center rounded-full bg-danger-3 px-2 py-1 text-center text-xs font-medium text-danger-11">
              -{discountPercentage}%
            </dd>
          </>
        )}
      </dl>
    </article>
  );
};

Product.displayName = displayName;
