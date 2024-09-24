'use client';

import {
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from '@typeweave/react/drawer';
import { createDialogState } from '@typeweave/react-utils';
import { navLinks } from '../_constants/nav-links';
import { Button } from '@typeweave/react/button';
import { MenuIcon, XIcon } from 'lucide-react';
import { siteConfig } from '../site.config';
import { NavLink } from './nav-link';
import { Branding } from '@repo/ui';
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
          isIconOnly
          aria-label="open menu"
          className="text-2xl lg:hidden"
        >
          <MenuIcon />
        </Button>
      </DrawerTrigger>

      <DrawerPortal>
        <DrawerOverlay />

        <DrawerContent className="px-5">
          <div className="flex h-16 items-center justify-between gap-2">
            <Branding
              href={siteConfig.pathname}
              className="font-logo"
            >
              {siteConfig.name}
            </Branding>

            <Button
              isIconOnly
              aria-label="close menu"
              color="danger"
              size="sm"
              variant="text"
            >
              <XIcon />
            </Button>
          </div>

          <nav className="flex flex-col gap-1">
            {navLinks.map((ele, i) => (
              <NavLink
                handleClose={handleClose}
                key={i}
                href={`${siteConfig.pathname}${ele.href}`}
                className="ring-focus before:bg-primary-9 hover:bg-muted-3 active:bg-muted-4 group relative grid h-12 w-full grid-cols-[48px_1fr] items-center overflow-hidden whitespace-nowrap rounded capitalize outline-none before:absolute before:bottom-0 before:left-0 before:top-1/2 before:hidden before:h-1/3 before:w-1 before:-translate-y-1/2 before:rounded-full focus-visible:ring-2 data-[active=true]:before:block"
              >
                <span className="group-data-[active=true]:text-primary-11 mx-auto">
                  {ele.icon}
                </span>
                <span>{ele.label}</span>
              </NavLink>
            ))}
          </nav>
        </DrawerContent>
      </DrawerPortal>
    </DrawerRoot>
  );
};

MobileDrawer.displayName = displayName;
