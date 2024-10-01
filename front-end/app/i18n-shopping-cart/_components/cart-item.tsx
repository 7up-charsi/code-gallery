'use client';

import { Button } from '@typeweave/react/button';
import { ProductItem } from '../_types/product';
import { useCart } from '../_hooks/cart';
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
    <article aria-labelledby={titleId} className="flex flex-col">
      <div id={titleId} className="truncate font-medium">
        {name}
      </div>

      <div className="mt-1 flex gap-1">
        <Image
          src={image.thumbnail}
          alt={name}
          width={60}
          height={60}
          className="mr-2 rounded"
        />

        <dl className="flex grow items-center gap-3">
          <dt className="sr-only">price</dt>
          <dd className="">${price}</dd>

          <dt className="sr-only">amount in cart</dt>
          <dd className="font-medium">x{amount}</dd>

          <dt className="sr-only">price of {amount} items</dt>
          <dd className="text-muted-12 font-medium">
            ${price * amount}
          </dd>
        </dl>

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
      </div>
    </article>
  );
};

CartItem.displayName = displayName;
