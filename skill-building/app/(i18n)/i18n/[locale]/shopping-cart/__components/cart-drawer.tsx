'use client';

import {
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
} from '@typeweave/react/drawer';
import { useIsMounted } from '@typeweave/react/use-is-mounted';
import { useCartDrawer } from '../__zustand/cart-drawer';
import { Cart } from './cart';
import React from 'react';

interface CartDrawerProps {}

const displayName = 'CartDrawer';

export const CartDrawer = (props: CartDrawerProps) => {
  const {} = props;

  const isMounted = useIsMounted();

  const cartDrawerState = useCartDrawer();

  return (
    <>
      {!isMounted ? null : (
        <DrawerRoot
          open={cartDrawerState.open}
          onOpenChange={cartDrawerState.onOpenChange}
        >
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
      )}
    </>
  );
};

CartDrawer.displayName = displayName;
