'use client';

import {
  Button,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
  Skeleton,
  useIsMounted,
} from '@typeweave/react';
import { LocaleChanger } from './locale-changer';
import { ThemeSwitcher } from './theme-switcher';
import { MenuIcon } from 'lucide-react';
import { Branding } from './branding';
import React from 'react';

interface HeaderProps {}

const displayName = 'Header';

export const Header = (props: HeaderProps) => {
  const {} = props;

  const isMounted = useIsMounted();

  return (
    <header className="mx-auto flex h-16 max-w-screen-md items-center gap-3 border-muted-6 bg-background px-5 dark:bg-muted-1 max-md:border-b">
      <Branding />

      <div className="grow"></div>

      {!isMounted && (
        <>
          <Skeleton
            variant="rounded"
            className="h-9 w-40 max-md:hidden"
          />
          <Skeleton
            variant="rounded"
            className="h-9 w-[108px] max-md:hidden"
          />

          <Skeleton variant="rounded" className="h-9 w-9 md:hidden" />
        </>
      )}

      {isMounted && (
        <>
          <LocaleChanger className="w-40 max-md:hidden" />
          <ThemeSwitcher className="max-md:hidden" />
        </>
      )}

      {isMounted && (
        <DrawerRoot>
          <DrawerTrigger>
            <Button
              isIconOnly
              aria-label="menu"
              className="md:hidden"
            >
              <MenuIcon />
            </Button>
          </DrawerTrigger>

          <DrawerPortal>
            <DrawerOverlay />
            <DrawerContent className="px-5">
              <div className="flex h-16 items-center justify-center">
                <Branding />
              </div>

              <LocaleChanger className="w-full" />
              <ThemeSwitcher className="mt-3 w-full" />
            </DrawerContent>
          </DrawerPortal>
        </DrawerRoot>
      )}
    </header>
  );
};

Header.displayName = displayName;
