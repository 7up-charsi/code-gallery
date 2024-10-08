import { Button } from '@typeweave/react/button';
import { useCart } from '../_hooks/cart';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const displayName = 'CartItem';

export const CartItem = () => {
  const titleId = React.useId();

  const { amount, clearCart } = useCart();

  return (
    <article aria-labelledby={titleId} className=" ">
      <h2 id={titleId} className="truncate">
        Fall Limited Edition Sneakers
      </h2>

      <div className="mt-2 flex h-full gap-2">
        <Image
          src="/assets/ecommerce-product/image-product-1.jpg"
          alt="product image"
          width={60}
          height={60}
          className="rounded"
        />

        <dl className="flex grow flex-col justify-center">
          <div className="flex gap-2">
            <dt className="sr-only">price</dt>
            <dd>$125.00</dd>

            <dt className="sr-only">amount in cart</dt>
            <dd className="font-semibold">x{amount}</dd>
          </div>

          <dt className="sr-only">total</dt>
          <dd className="font-semibold"> = ${amount * 125}.00</dd>
        </dl>

        <Button
          isIconOnly
          aria-label="remove from cart"
          size="sm"
          color="danger"
          variant="text"
          onPress={clearCart}
          className="place-self-center"
        >
          <XIcon />
        </Button>
      </div>
    </article>
  );
};

CartItem.displayName = displayName;
