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
import { ThemeSwitcher } from './theme-switcher';
import { LangSwitcher } from './lang-switcher';
import { MenuIcon, XIcon } from 'lucide-react';
import { siteConfig } from '../site.config';
import React from 'react';

interface AppBarProps {}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const {} = props;

  const isMounted = useIsMounted();

  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const scrollhandler = () => {
      const bodyScrolled =
        document.body.scrollTop || document.documentElement.scrollTop;

      if (bodyScrolled) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', scrollhandler);

    return () => {
      window.removeEventListener('scroll', scrollhandler);
    };
  }, []);

  return (
    <header
      data-scrolled={isScrolled}
      className="sticky -top-10 z-50 bg-background data-[scrolled=true]:shadow-md"
    >
      <PortfolioHeader />

      <div className="flex h-16 items-center gap-3 px-5">
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
              className="h-9 w-20 max-md:hidden"
            />
          </>
        )}

        {isMounted && (
          <>
            <LangSwitcher className="w-40 max-md:hidden" />
            <ThemeSwitcher className="max-md:hidden" />
          </>
        )}

        <DrawerRoot>
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

            <DrawerContent placement="left" className="px-5">
              <div className="flex h-16 items-center justify-between">
                <Branding href={siteConfig.pathname}>
                  {siteConfig.name}
                </Branding>

                <Button
                  isIconOnly
                  aria-label="menu close"
                  variant="text"
                  color="danger"
                >
                  <XIcon />
                </Button>
              </div>

              <LangSwitcher className="w-full" />
              <ThemeSwitcher className="mt-3 w-full *:grow" />
            </DrawerContent>
          </DrawerPortal>
        </DrawerRoot>
      </div>
    </header>
  );
};

AppBar.displayName = displayName;
