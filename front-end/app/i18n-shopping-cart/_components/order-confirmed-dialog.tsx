'use client';

import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
} from '@typeweave/react/dialog';
import { useOrderConfirmedDialog } from '../_hooks/order-confirmed-dialog';
import { OrderConfirmed } from './order-confirmed';
import React from 'react';

interface OrderConfirmedDialogProps {}

const displayName = 'OrderConfirmedDialog';

export const OrderConfirmedDialog = (
  props: OrderConfirmedDialogProps,
) => {
  const {} = props;

  const titleId = React.useId();
  const descId = React.useId();

  const { open } = useOrderConfirmedDialog();

  return (
    <DialogRoot open={open}>
      <DialogPortal>
        <DialogOverlay variant="blur" className="max-lg:hidden" />

        <DialogContent
          aria-labelledby={titleId}
          aria-describedby={descId}
          className="max-h-[80vh] max-lg:hidden"
        >
          <OrderConfirmed titleId={titleId} descId={descId} />
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};

OrderConfirmedDialog.displayName = displayName;
