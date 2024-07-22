import { Button } from '@typeweave/react/button';
import { ShoppingBagIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  discount_price: string;
  rating: number;
  image: string;
}

const displayName = 'ProductCard';

export const ProductCard = (props: ProductCardProps) => {
  const { id, image, name, discount_price, price, rating } = props;

  return (
    <Link
      href="/"
      className="relative -ml-px -mt-px border border-muted-6 outline-none ring-primary-8 hover:z-50 hover:shadow-[0px_0px_5px] focus-visible:ring-2 active:border-primary-8 active:shadow-[0px_0px_8px] [&:is(:hover,:active)]:border-primary-7 [&:is(:hover,:active)]:shadow-primary-9/50"
    >
      <article
        aria-labelledby={id}
        className="grid h-full w-full grid-cols-1 grid-rows-[1fr_auto] gap-2 bg-background pb-2"
      >
        <div className="relative m-5">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain"
          />
        </div>

        <div className="flex gap-2 px-3">
          <dl className="grow">
            <dt className="sr-only">name</dt>
            <dd id={id} className="truncate text-sm capitalize">
              {name}
            </dd>

            <div className="mt-1 flex gap-2 text-muted-12">
              <dt className="sr-only">price</dt>
              <dd id={id} className="font-medium">
                ${price}
              </dd>

              {discount_price && (
                <>
                  <dt className="sr-only">discounted price</dt>
                  <dd id={id} className="text-muted-11">
                    <del>${discount_price}</del>
                  </dd>
                </>
              )}
            </div>

            <dt className="sr-only">rating</dt>
            <dd>{rating}</dd>
          </dl>

          <div className="content-center">
            <Button isIconOnly aria-label="add to cart">
              <ShoppingBagIcon />
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
};

ProductCard.displayName = displayName;
