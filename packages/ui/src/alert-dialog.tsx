'use client';

import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTrigger,
} from '@typeweave/react/dialog';
import React from 'react';

interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description: string;
  content?: React.ReactNode;
  children: React.ReactNode;
  trigger?: React.ReactNode;
}

const displayName = 'AlertDialog';

export const AlertDialog = (props: AlertDialogProps) => {
  const {
    description,
    title,
    children,
    onOpenChange,
    open,
    content,
    trigger,
  } = props;

  const titleId = React.useId();
  const descId = React.useId();

  return (
    <DialogRoot
      open={open}
      onOpenChange={onOpenChange}
      onClose={(e, reason) => {
        if (reason === 'outside') {
          e.preventDefault();
        }
      }}
    >
      {trigger && <DialogTrigger>{trigger}</DialogTrigger>}

      <DialogPortal>
        <DialogOverlay variant="blur" />

        <DialogContent
          aria-labelledby={titleId}
          aria-describedby={descId}
          className="p-5"
        >
          <div
            id={titleId}
            className="text-xl font-medium first-letter:uppercase"
          >
            {title}
          </div>

          <p id={descId} className="mt-2">
            {description}
          </p>

          {content}

          <div className="mt-5 flex items-center justify-end gap-3">
            {children}
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};

AlertDialog.displayName = displayName;
