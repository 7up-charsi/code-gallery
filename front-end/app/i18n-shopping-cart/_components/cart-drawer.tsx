'use client';

import {
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
} from '@typeweave/react/drawer';
import { CartDrawerContent } from './cart-drawer-content';
import { CartDrawerButton } from './cart-drawer-button';
import React from 'react';

interface CartDrawerProps {}

const displayName = 'CartDrawer';

export const CartDrawer = (props: CartDrawerProps) => {
  const {} = props;

  return (
    <DrawerRoot>
      <CartDrawerButton />

      <DrawerPortal>
        <DrawerOverlay />
        <CartDrawerContent />
      </DrawerPortal>
    </DrawerRoot>
  );
};

CartDrawer.displayName = displayName;
