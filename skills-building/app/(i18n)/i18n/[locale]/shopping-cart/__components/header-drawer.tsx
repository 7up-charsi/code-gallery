'use client';

import {
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from '@typeweave/react/drawer';
import { useIsMounted } from '@typeweave/react/use-is-mounted';
import { Skeleton } from '@typeweave/react/skeleton';
import { Button } from '@typeweave/react/button';
import { Branding } from '@/components/branding';
import { LocaleChanger } from './locale-changer';
import { ThemeSwitcher } from './theme-switcher';
import { siteConfig } from '../site.config';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface MobileDrawerProps {}

const displayName = 'HeaderDrawer';

export const HeaderDrawer = (props: MobileDrawerProps) => {
  const {} = props;

  const isMounted = useIsMounted();

  return (
    <>
      {isMounted ? null : (
        <Skeleton variant="rounded" className="h-9 w-9 lg:hidden" />
      )}

      {!isMounted ? null : (
        <DrawerRoot>
          <DrawerTrigger>
            <Button
              isIconOnly
              aria-label="menu"
              color="primary"
              variant="solid"
              className="text-2xl lg:hidden"
            >
              <MenuIcon />
            </Button>
          </DrawerTrigger>

          <DrawerPortal>
            <DrawerOverlay />

            <DrawerContent className="px-5">
              <aside>
                <div className="flex h-16 items-center justify-center">
                  <Branding href={siteConfig.pathname}>
                    {siteConfig.name}
                  </Branding>
                </div>

                <LocaleChanger className="mt-5 w-full" />
                <ThemeSwitcher className="mt-3 w-full" />
              </aside>
            </DrawerContent>
          </DrawerPortal>
        </DrawerRoot>
      )}
    </>
  );
};

HeaderDrawer.displayName = displayName;
