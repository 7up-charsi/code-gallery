'use client';

import {
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from '@typeweave/react/drawer';
import { useCartDrawer } from '../_hooks/cart-drawer';
import { CartDrawerButton } from './cart-drawer-button';
import { ShoppingBasketIcon } from 'lucide-react';
import { Button } from '@typeweave/react/button';
import { Badge } from '@typeweave/react/badge';
import { useCart } from '../_hooks/cart';
import { Cart } from './cart';
import React from 'react';

interface CartDrawerProps {}

const displayName = 'CartDrawer';

export const CartDrawer = (props: CartDrawerProps) => {
  const {} = props;

  const { open, onOpenChange } = useCartDrawer();

  return (
    <DrawerRoot open={open} onOpenChange={onOpenChange}>
      <CartDrawerButton />

      <DrawerPortal>
        <DrawerOverlay variant="blur" className="lg:hidden" />

        <DrawerContent
          placement="bottom"
          className="flex max-h-[90vh] w-full rounded-t-xl lg:hidden"
        >
          <Cart />
        </DrawerContent>
      </DrawerPortal>
    </DrawerRoot>
  );
};

CartDrawer.displayName = displayName;
