'use client';

import {
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from '@typeweave/react/drawer';
import { createDialogState } from '@typeweave/react-utils';
import { ChevronDown, XIcon } from 'lucide-react';
import { Button } from '@typeweave/react/button';
import { TocContent } from './toc-content';
import React from 'react';

interface MobileDrawerProps {}

const displayName = 'MobileDrawer';

export const useMobileDrawerState = createDialogState();

export const MobileDrawer = (props: MobileDrawerProps) => {
  const {} = props;

  const { open, handleClose, handleOpenChange } =
    useMobileDrawerState();

  return (
    <DrawerRoot
      open={open}
      onClose={handleClose}
      onOpenChange={handleOpenChange}
    >
      <DrawerTrigger>
        <Button
          className="mx-5 my-3 justify-between md:hidden"
          endContent={<ChevronDown />}
        >
          Table of Content
        </Button>
      </DrawerTrigger>

      <DrawerPortal>
        <DrawerOverlay className="md:hidden" />

        <DrawerContent
          placement="bottom"
          className="flex max-h-[calc(100vh-100px)] flex-col overflow-hidden rounded-t-2xl md:hidden"
        >
          <div className="border-muted-6 flex items-center justify-between gap-2 border-b px-5 py-3">
            <h2 className="text-muted-12">Table of Content</h2>

            <DrawerClose>
              <Button
                isIconOnly
                aria-label="close"
                color="danger"
                variant="text"
                className="text-xl"
                size="sm"
              >
                <XIcon />
              </Button>
            </DrawerClose>
          </div>

          <div className="grow overflow-auto px-5 py-3">
            <TocContent />
          </div>
        </DrawerContent>
      </DrawerPortal>
    </DrawerRoot>
  );
};

MobileDrawer.displayName = displayName;
