import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
} from '@typeweave/react/dialog';
import { createDialogState } from '@typeweave/react-utils';
import { useDictionaryCtx } from './dictionary-provider';
import { Control, useWatch } from 'react-hook-form';
import { Button } from '@typeweave/react/button';
import { XIcon } from 'lucide-react';
import { FormValues } from './form';
import React from 'react';

interface ResultDialogProps {
  control: Control<FormValues>;
}

const displayName = 'ResultDialog';

export const useResultDialogState = createDialogState();

export const ResultDialog = (props: ResultDialogProps) => {
  const { control } = props;

  const titleId = React.useId();

  const { dictionary } = useDictionaryCtx(displayName);

  const [interestOnlyPayment, totalRepayment, monthlyRepayment] =
    useWatch({
      control,
      name: [
        'interestOnlyPayment',
        'totalRepayment',
        'monthlyRepayment',
      ],
    });

  const { handleClose, handleOpenChange, open } =
    useResultDialogState();

  return (
    <DialogRoot
      open={open}
      onClose={handleClose}
      onOpenChange={handleOpenChange}
    >
      <DialogPortal>
        <DialogOverlay />

        <DialogContent aria-labelledby={titleId} className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <div
              id={titleId}
              className="text-lg font-medium capitalize"
            >
              {dictionary.resultsTitle}
            </div>

            <DialogClose>
              <Button
                variant="text"
                color="danger"
                isIconOnly
                aria-label="close results dialog"
                className="text-xl"
              >
                <XIcon />
              </Button>
            </DialogClose>
          </div>

          {!interestOnlyPayment ? null : (
            <p className="text-balance text-center">
              <span className="inline-block font-medium capitalize">
                {dictionary.interestOnlyHeading}
              </span>

              <br />

              <span className="scrollbar-thin mt-2 inline-block overflow-x-auto py-2 text-center text-4xl font-medium">
                {interestOnlyPayment}
              </span>
            </p>
          )}

          {!monthlyRepayment ? null : (
            <p className="text-balance text-center">
              <span className="inline-block font-medium capitalize">
                {dictionary.monthlyHeading}
              </span>

              <br />

              <span className="scrollbar-thin mt-2 inline-block overflow-x-auto py-2 text-center text-4xl font-medium">
                {monthlyRepayment}
              </span>
            </p>
          )}

          {!totalRepayment ? null : (
            <p className="text-balance text-center">
              <span className="mt-5 inline-block font-medium capitalize">
                {dictionary.totalHeading}
              </span>

              <br />

              <span className="scrollbar-thin mt-2 inline-block overflow-x-auto py-2 text-center text-4xl font-medium">
                {totalRepayment}
              </span>
            </p>
          )}
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};

ResultDialog.displayName = displayName;
