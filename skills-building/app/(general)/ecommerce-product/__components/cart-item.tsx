import { Button } from '@typeweave/react/button';
import { useCart } from '../__zustand/cart';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface CartItemProps {}

const displayName = 'CartItem';

export const CartItem = (props: CartItemProps) => {
  const {} = props;

  const titleId = React.useId();

  const { amount, clearCart } = useCart();

  return (
    <article
      aria-labelledby={titleId}
      className="flex items-center gap-4"
    >
      <Image
        src="/assets/ecommerce-product/image-product-1.jpg"
        alt="product image"
        width={50}
        height={50}
        className="rounded"
      />

      <div className="flex h-full grow flex-col justify-between overflow-auto">
        <h2 id={titleId} className="truncate">
          Fall Limited Edition Sneakers
        </h2>
        <dl className="flex gap-3">
          <dt className="sr-only">price</dt>
          <dd>$125.00</dd>

          <dt className="sr-only">amount in cart</dt>
          <dd className="font-semibold">x{amount}</dd>

          <dt className="sr-only">total</dt>
          <dd className="font-semibold">${amount * 125}.00</dd>
        </dl>
      </div>

      <Button
        isIconOnly
        aria-label="remove from cart"
        size="sm"
        color="danger"
        variant="text"
        onPress={clearCart}
      >
        <XIcon />
      </Button>
    </article>
  );
};

CartItem.displayName = displayName;
