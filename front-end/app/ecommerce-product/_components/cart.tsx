'use client';

import {
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from '@typeweave/react/drawer';
import { PointerEvents } from '@typeweave/react/pointer-events';
import { Button } from '@typeweave/react/button';
import { ShoppingCartIcon } from 'lucide-react';
import { Badge } from '@typeweave/react/badge';
import { useCart } from '../_hooks/cart';
import { toast } from 'react-toastify';
import { CartItem } from './cart-item';
import React from 'react';

interface CartProps {}

const displayName = 'Cart';

export const Cart = (props: CartProps) => {
  const {} = props;

  const titleId = React.useId();

  const { amount, clearCart } = useCart();

  return (
    <DrawerRoot>
      <DrawerTrigger>
        <PointerEvents>
          <Badge
            content={amount}
            placement="bottom-center"
            classNames={{ content: 'pointer-events-none' }}
          >
            <Button
              isIconOnly
              aria-label="menu"
              variant="text"
              className="overflow-visible"
            >
              <ShoppingCartIcon />
            </Button>
          </Badge>
        </PointerEvents>
      </DrawerTrigger>

      <DrawerPortal>
        <DrawerOverlay />

        <DrawerContent
          placement="right"
          aria-labelledby={titleId}
          className="w-[320px]"
        >
          <div
            id={titleId}
            className="border-muted-6 border-b px-5 py-3"
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

                <DrawerClose>
                  <Button
                    color="primary"
                    variant="solid"
                    className="mt-10 w-full"
                    onPress={() => {
                      clearCart();
                      toast.success('Thanks for shopping');
                    }}
                  >
                    check out
                  </Button>
                </DrawerClose>
              </>
            ) : null}
          </div>
        </DrawerContent>
      </DrawerPortal>
    </DrawerRoot>
  );
};

Cart.displayName = displayName;
