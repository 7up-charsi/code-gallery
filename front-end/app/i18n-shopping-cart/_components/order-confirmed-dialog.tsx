'use client';

import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
} from '@typeweave/react/dialog';
import { createDialogState } from '@typeweave/react-utils';
import { useDictionaryCtx } from './dictionary-provider';
import { Button } from '@typeweave/react/button';
import { SmileIcon, XIcon } from 'lucide-react';
import React from 'react';

const displayName = 'OrderConfirmedDialog';

export const useOrderConfirmedDialogState = createDialogState();

export const OrderConfirmedDialog = () => {
  const { open, handleOpenChange, handleClose } =
    useOrderConfirmedDialogState();

  const dictionary = useDictionaryCtx(displayName);

  return (
    <DialogRoot
      open={open}
      onOpenChange={handleOpenChange}
      onClose={(e, reason) => {
        if (reason === 'outside') e.preventDefault();
      }}
    >
      <DialogPortal>
        <DialogOverlay variant="blur" />

        <DialogContent
          aria-labelledby="order-confirmed-title"
          aria-describedby="thank-you-desc"
          className="p-10"
        >
          <Button
            color="danger"
            onPress={handleClose}
            isIconOnly
            aria-label="close thank you dialog"
            className="absolute right-5 top-5"
          >
            <XIcon />
          </Button>

          <SmileIcon
            size={70}
            className="fill-warning-3 stroke-warning-8 mx-auto"
          />

          <div
            id="order-confirmed-title"
            className="from-muted-12 to-muted-11 mt-5 bg-gradient-to-t bg-clip-text text-center text-3xl font-bold text-transparent first-letter:uppercase"
          >
            {dictionary.orderConfirmed}
          </div>

          <p id="thank-you-desc" className="mt-6 text-center">
            {dictionary.orderConfirmedDesc}
          </p>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};

OrderConfirmedDialog.displayName = displayName;
