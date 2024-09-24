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
import { SideBarContent } from './side-bar-content';
import { Button } from '@typeweave/react/button';
import { MenuIcon, XIcon } from 'lucide-react';
import { siteConfig } from '../site.config';
import { Branding } from '@repo/ui';
import React from 'react';

interface MobileDrawerProps {}

const displayName = 'MobileDrawer';

export const useMobileDrawerState = createDialogState();

export const MobileDrawer = (props: MobileDrawerProps) => {
  const {} = props;

  const { handleClose, handleOpenChange, open } =
    useMobileDrawerState();

  return (
    <DrawerRoot
      open={open}
      onClose={handleClose}
      onOpenChange={handleOpenChange}
    >
      <DrawerTrigger>
        <Button
          isIconOnly
          aria-label="menu"
          variant="text"
          className="text-2xl md:hidden"
        >
          <MenuIcon />
        </Button>
      </DrawerTrigger>

      <DrawerPortal>
        <DrawerOverlay />

        <DrawerContent>
          <div className="flex h-16 items-center justify-between px-5">
            <Branding href={siteConfig.pathname}>
              {siteConfig.name}
            </Branding>

            <DrawerClose>
              <Button
                isIconOnly
                aria-label="menu"
                variant="text"
                color="danger"
              >
                <XIcon />
              </Button>
            </DrawerClose>
          </div>

          <SideBarContent isExpanded />
        </DrawerContent>
      </DrawerPortal>
    </DrawerRoot>
  );
};

MobileDrawer.displayName = displayName;
