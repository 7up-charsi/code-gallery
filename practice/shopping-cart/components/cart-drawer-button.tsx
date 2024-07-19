'use client';

import { useCartDrawer } from '@/zustand/cart-drawer';
import { ShoppingBasketIcon } from 'lucide-react';
import { Button } from '@typeweave/react/button';
import { Badge } from '@typeweave/react/badge';
import { useCart } from '@/zustand/cart';
import React from 'react';

interface CartDrawerButtonProps {}

const displayName = 'CartDrawerButton';

export const CartDrawerButton = (props: CartDrawerButtonProps) => {
  const {} = props;

  const onOpen = useCartDrawer((state) => state.onOpen);

  const items = useCart((state) => state.items);

  const itemsInCart = items.reduce(
    (acc, item) => ((acc += item.amount), acc),
    0,
  );

  return (
    <Badge
      className="lg:hidden"
      content={itemsInCart}
      placement="bottom-center"
    >
      <Button
        isIconOnly
        aria-label={
          itemsInCart ? `cart has ${itemsInCart} items` : 'cart'
        }
        color="primary"
        variant="text"
        onPress={onOpen}
      >
        <ShoppingBasketIcon />
      </Button>
    </Badge>
  );
};

CartDrawerButton.displayName = displayName;
