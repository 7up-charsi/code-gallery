'use client';

import {
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
} from '@typeweave/react/drawer';
import { useOrderConfirmedDrawer } from '@/zustand/order-confirmed-drawer';
import { useIsMounted } from '@typeweave/react/use-is-mounted';
import { OrderConfirmed } from '../order-confirmed';
import React from 'react';

interface OrderConfirmedDrawerProps {}

const displayName = 'OrderConfirmedDrawer';

export const OrderConfirmedDrawer = (
  props: OrderConfirmedDrawerProps,
) => {
  const {} = props;

  const isMounted = useIsMounted();

  const { open } = useOrderConfirmedDrawer();

  return !isMounted ? null : (
    <DrawerRoot open={open}>
      <DrawerPortal>
        <DrawerOverlay variant="blur" className="lg:hidden" />

        <DrawerContent
          placement="bottom"
          className="flex max-h-[90vh] w-full rounded-t-xl lg:hidden"
        >
          <OrderConfirmed />
        </DrawerContent>
      </DrawerPortal>
    </DrawerRoot>
  );
};

OrderConfirmedDrawer.displayName = displayName;
