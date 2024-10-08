'use client';

import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
} from '@typeweave/react/dialog';
import { createDialogState } from '@typeweave/react-utils';
import { FormValues } from '../[locale]/skill-demo/page';
import { useDictionaryCtx } from './dictionary-provider';
import { useFormSteps } from '../_hooks/form-steps';
import { Button } from '@typeweave/react/button';
import { useFormContext } from 'react-hook-form';
import { SmileIcon, XIcon } from 'lucide-react';
import React from 'react';

const displayName = 'ThankYouDialog';

export const useThankYouDialogState = createDialogState();

export const ThankYouDialog = () => {
  const { reset } = useFormContext<FormValues>();

  const { open, handleOpenChange } = useThankYouDialogState();

  const dictionary = useDictionaryCtx(displayName);

  const updateStep = useFormSteps((s) => s.updateStep);

  return (
    <DialogRoot
      open={open}
      onOpenChange={handleOpenChange}
      onClose={(e, reason) => {
        if (reason === 'outside') {
          e.preventDefault();
          return;
        }

        updateStep(1);
        reset();
      }}
    >
      <DialogPortal>
        <DialogOverlay variant="blur" />

        <DialogContent
          aria-labelledby="thank-you-title"
          aria-describedby="thank-you-desc"
          className="p-10"
        >
          <DialogClose>
            <Button
              color="danger"
              isIconOnly
              aria-label="close thank you dialog"
              className="absolute right-5 top-5"
            >
              <XIcon />
            </Button>
          </DialogClose>

          <SmileIcon
            size={70}
            className="fill-warning-3 stroke-warning-8 mx-auto"
          />

          <div
            id="thank-you-title"
            className="from-muted-12 to-muted-11 mt-5 bg-gradient-to-t bg-clip-text text-center text-3xl font-bold text-transparent first-letter:uppercase"
          >
            {dictionary.thankYou.title}
          </div>

          <p id="thank-you-desc" className="mt-6 text-center">
            {dictionary.thankYou.description}
          </p>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};

ThankYouDialog.displayName = displayName;
