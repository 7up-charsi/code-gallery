'use client';

import {
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
} from '@typeweave/react/drawer';
import { CartDrawerButton } from './cart-drawer-button';
import { useCartDrawer } from '../_hooks/cart-drawer';
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
