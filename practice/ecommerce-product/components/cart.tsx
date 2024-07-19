'use client';

import {
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from '@typeweave/react/popover';
import { Button } from '@typeweave/react/button';
import { ShoppingCartIcon } from 'lucide-react';
import { Badge } from '@typeweave/react/badge';
import { useCart } from '@/zustand/cart';
import { CartItem } from './cart-item';
import React from 'react';

interface CartProps {}

const displayName = 'Cart';

export const Cart = (props: CartProps) => {
  const {} = props;

  const titleId = React.useId();

  const { amount, remove } = useCart();

  return (
    <PopoverRoot>
      <PopoverTrigger>
        <Badge content={amount} placement="bottom-center">
          <Button
            isIconOnly
            aria-label="menu"
            variant="text"
            className="overflow-visible"
          >
            <ShoppingCartIcon />
          </Button>
        </Badge>
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent
          placement="bottom"
          className="z-50 w-auto max-w-md md:min-w-80"
          aria-labelledby={titleId}
        >
          <div
            id={titleId}
            className="w-80 border-b border-muted-6 px-5 py-3"
          >
            Cart
          </div>

          <div className="p-5">
            {!amount ? (
              <div className="flex justify-center py-3">
                <span>Your cart is empty</span>
              </div>
            ) : null}

            {amount ? (
              <>
                <CartItem />

                <PopoverClose>
                  <Button
                    color="primary"
                    variant="solid"
                    className="mt-5 h-12 w-full"
                    onPress={remove}
                  >
                    check out
                  </Button>
                </PopoverClose>
              </>
            ) : null}
          </div>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  );
};

Cart.displayName = displayName;
