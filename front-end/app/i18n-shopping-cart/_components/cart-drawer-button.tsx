import { DrawerTrigger } from '@typeweave/react/drawer';
import { ShoppingBasketIcon } from 'lucide-react';
import { Button } from '@typeweave/react/button';
import { Badge } from '@typeweave/react/badge';
import { useCart } from '../_hooks/cart';
import React from 'react';

interface CartDrawerButtonProps {}

const displayName = 'CartDrawerButton';

export const CartDrawerButton = (props: CartDrawerButtonProps) => {
  const {} = props;

  const items = useCart((s) => s.items);

  const itemsInCart = items.reduce(
    (acc, item) => ((acc += item.amount), acc),
    0,
  );

  return (
    <Badge content={itemsInCart} placement="bottom-center">
      <DrawerTrigger>
        <Button
          variant="text"
          isIconOnly
          aria-label={
            itemsInCart ? `cart has ${itemsInCart} items` : 'cart'
          }
        >
          <ShoppingBasketIcon />
        </Button>
      </DrawerTrigger>
    </Badge>
  );
};

CartDrawerButton.displayName = displayName;
