'use client';

import {
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from '@typeweave/react/drawer';
import { PortfolioHeader } from '@/components/portfolio-header';
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

interface HeaderProps {}

const displayName = 'Header';

export const Header = (props: HeaderProps) => {
  const {} = props;

  const isMounted = useIsMounted();

  return (
    <header className="mx-auto max-w-screen-md">
      <PortfolioHeader />

      <div className="flex h-16 items-center gap-3 border-muted-6 bg-background px-5 dark:bg-muted-1 max-md:border-b">
        <Branding href={siteConfig.pathname}>
          {siteConfig.name}
        </Branding>

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

            <Skeleton
              variant="rounded"
              className="h-9 w-9 md:hidden"
            />
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
                className="text-2xl md:hidden"
              >
                <MenuIcon />
              </Button>
            </DrawerTrigger>

            <DrawerPortal>
              <DrawerOverlay />
              <DrawerContent className="px-5">
                <Branding href={siteConfig.pathname}>
                  {siteConfig.name}
                </Branding>

                <LocaleChanger className="w-full" />
                <ThemeSwitcher className="mt-3 w-full" />
              </DrawerContent>
            </DrawerPortal>
          </DrawerRoot>
        )}
      </div>
    </header>
  );
};

Header.displayName = displayName;
