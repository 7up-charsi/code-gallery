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
import { ShoppingCartIcon, XIcon } from 'lucide-react';
import { Button } from '@typeweave/react/button';
import { Badge } from '@typeweave/react/badge';
import { useCart } from '../_hooks/cart';
import { toast } from 'react-toastify';
import { CartItem } from './cart-item';
import React from 'react';

interface CartDrawerProps {}

const displayName = 'CartDrawer';

export const CartDrawer = (props: CartDrawerProps) => {
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
              aria-label="cart drawer open"
              variant="text"
              className="text-xl"
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
          className="sm:w-[350px]"
        >
          <div
            id={titleId}
            className="border-muted-6 flex items-center justify-between border-b px-5 py-3"
          >
            <span>Cart</span>

            <DrawerClose>
              <Button
                isIconOnly
                aria-label="cart drawer close"
                variant="text"
                color="danger"
                className="text-xl"
              >
                <XIcon />
              </Button>
            </DrawerClose>
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

CartDrawer.displayName = displayName;
