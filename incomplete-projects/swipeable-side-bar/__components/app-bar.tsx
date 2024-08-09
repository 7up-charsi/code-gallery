'use client';

import {
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from '@typeweave/react/drawer';
import { PortfolioHeader } from '@/components/portfolio-header';
import { SideBarContent } from './side-bar-content';
import { Button } from '@typeweave/react/button';
import { Branding } from '@/components/branding';
import { MenuIcon, XIcon } from 'lucide-react';
import { siteConfig } from '../site.config';
import React from 'react';

interface AppBarProps {}

const displayName = 'AppBar';

const hideThreshold = 100;
const showThreshold = 30;

export const AppBar = (props: AppBarProps) => {
  const {} = props;

  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const bodyScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

      if (bodyScroll) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      data-scrolled={isScrolled}
      className="sticky left-0 right-0 top-0 mx-auto max-w-screen-2xl transition-transform data-[scrolled=true]:shadow-md"
    >
      <PortfolioHeader />

      <div className="flex h-16 items-center bg-muted-2 px-5">
        <Branding href={siteConfig.pathname}>
          {siteConfig.name}
        </Branding>

        <div className="grow"></div>

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
            <DrawerOverlay className="md:hidden" />
            <DrawerContent className="md:hidden">
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

              <SideBarContent />
            </DrawerContent>
          </DrawerPortal>
        </DrawerRoot>
      </div>
    </header>
  );
};

AppBar.displayName = displayName;
