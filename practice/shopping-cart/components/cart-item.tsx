'use client';

import { Button } from '@typeweave/react/button';
import { ProductItem } from '@/types/product';
import { useCart } from '@/zustand/cart';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface CartItemProps extends ProductItem {
  amount: number;
}

const displayName = 'CartItem';

export const CartItem = (props: CartItemProps) => {
  const { image, amount, name, price, id } = props;

  const titleId = React.useId();

  const removeItem = useCart((state) => state.removeItem);

  return (
    <article aria-labelledby={titleId} className="flex w-full gap-3">
      <div className="relative aspect-square w-16 shrink-0 overflow-hidden rounded">
        <Image
          src={image.thumbnail}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex grow flex-col overflow-hidden">
        <h3 id={titleId} className="grow truncate font-semibold">
          {name}
        </h3>

        <dl className="flex grow items-center gap-3">
          <dt className="sr-only">amount in cart</dt>
          <dd className="font-semibold text-primary-11">{amount}x</dd>

          <dt className="sr-only">price</dt>
          <dd className="">@{price}</dd>

          <dt className="sr-only">price of {amount} items</dt>
          <dd className="font-semibold">${price * amount}</dd>
        </dl>
      </div>

      <Button
        size="sm"
        isIconOnly
        aria-label="remove item"
        color="danger"
        variant="text"
        className="shrink-0 self-center"
        onPress={() => removeItem(id)}
      >
        <XIcon />
      </Button>
    </article>
  );
};

CartItem.displayName = displayName;
