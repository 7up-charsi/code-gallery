'use client';

import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTrigger,
} from '@typeweave/react/dialog';
import { Button } from '@typeweave/react/button';
import React from 'react';

interface AlertDialogProps {
  title: string;
  description: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const displayName = 'AlertDialog';

export const AlertDialog = (props: AlertDialogProps) => {
  const { description, title, children, trigger } = props;

  const titleId = React.useId();
  const descId = React.useId();

  return (
    <DialogRoot>
      <DialogTrigger>{trigger}</DialogTrigger>

      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          aria-labelledby={titleId}
          aria-describedby={descId}
          className="w-full max-w-sm p-5"
        >
          <div
            id={titleId}
            className="font-bold text-muted-12 first-letter:uppercase"
          >
            {title}
          </div>

          <div id={descId} className="mt-1 text-balance text-sm">
            {description}
          </div>

          <div className="mt-5 flex items-center justify-end gap-2">
            <DialogClose>
              <Button variant="text">Close</Button>
            </DialogClose>

            {children}
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};

AlertDialog.displayName = displayName;
