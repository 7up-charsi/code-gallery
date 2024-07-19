import { ProductItem } from '@/types/product';
import Image from 'next/image';
import React from 'react';

interface OrderConfirmedItemProps extends ProductItem {
  amount: number;
}

const displayName = 'OrderConfirmedItem';

export const OrderConfirmedItem = (
  props: OrderConfirmedItemProps,
) => {
  const { image, amount, name, price } = props;

  const titleId = React.useId();

  return (
    <article aria-labelledby={titleId} className="flex w-full gap-3">
      <div className="relative aspect-square w-16 overflow-hidden rounded">
        <Image
          src={image.thumbnail}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex grow flex-col">
        <h3 id={titleId} className="grow text-lg font-semibold">
          {name}
        </h3>

        <dl className="grow content-center space-x-3">
          <dt className="sr-only">amount in cart</dt>
          <dd className="font-semibold text-primary-11">{amount}x</dd>

          <dt className="sr-only">price</dt>
          <dd className="">@{price}</dd>
        </dl>
      </div>

      <dl>
        <dt className="sr-only">price of {amount} items</dt>
        <dd className="font-semibold">${price * amount}</dd>
      </dl>
    </article>
  );
};

OrderConfirmedItem.displayName = displayName;
