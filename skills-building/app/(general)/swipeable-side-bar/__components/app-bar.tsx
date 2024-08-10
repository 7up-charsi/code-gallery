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
import { useSwipeable } from '@typeweave/react/use-swipeable';
import { navLinks } from '../__constants/nav-links';
import { Button } from '@typeweave/react/button';
import { Branding } from '@/components/branding';
import { MenuIcon, XIcon } from 'lucide-react';
import { siteConfig } from '../site.config';
import { NavLink } from './nav-link';
import React from 'react';

interface AppBarProps {}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const {} = props;

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const handlers = useSwipeable({
    minDistance: 100,
    onSwipeRight: ({ event }) => {
      if (event.pointerType === 'touch') {
        event.preventDefault();
        setIsOpen(true);
      }
    },
  });

  React.useEffect(() => {
    document.addEventListener('pointerdown', handlers.onPointerDown);
    document.addEventListener('pointermove', handlers.onPointerMove);
    document.addEventListener('pointerup', handlers.onPointerUp);
    document.addEventListener(
      'pointercancel',
      handlers.onPointerCancel,
    );

    return () => {
      document.removeEventListener(
        'pointerdown',
        handlers.onPointerDown,
      );
      document.removeEventListener(
        'pointermove',
        handlers.onPointerMove,
      );
      document.removeEventListener('pointerup', handlers.onPointerUp);
      document.removeEventListener(
        'pointercancel',
        handlers.onPointerCancel,
      );
    };
  }, [
    handlers.onPointerCancel,
    handlers.onPointerDown,
    handlers.onPointerMove,
    handlers.onPointerUp,
  ]);

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

      <div className="flex h-16 items-center bg-muted-2 px-5 md:px-10">
        <Branding href={siteConfig.pathname}>
          {siteConfig.name}
        </Branding>

        <div className="grow"></div>

        <DrawerRoot open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger>
            <Button
              isIconOnly
              aria-label="menu"
              variant="text"
              className="text-2xl lg:hidden"
            >
              <MenuIcon />
            </Button>
          </DrawerTrigger>

          <DrawerPortal>
            <DrawerOverlay className="lg:hidden" />
            <DrawerContent className="lg:hidden">
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

              <nav
                id="side-bar-nav"
                className="flex flex-col gap-3 px-5 md:px-3 md:py-3"
              >
                {navLinks.map(({ icon, label, href }, i) => (
                  <NavLink
                    key={i}
                    href={`${siteConfig.pathname}${href}`}
                    className="grid h-12 w-full grid-cols-[46px_1fr] items-center overflow-hidden whitespace-nowrap rounded border border-transparent capitalize outline-none ring-focus hover:bg-muted-3 focus-visible:ring-2 active:bg-muted-4 data-[active=true]:border-primary-8 data-[active=true]:bg-primary-3 data-[active=true]:text-primary-11"
                  >
                    <span className="mx-auto">{icon}</span>
                    <span>{label}</span>
                  </NavLink>
                ))}
              </nav>
            </DrawerContent>
          </DrawerPortal>
        </DrawerRoot>

        <nav className="flex items-center gap-1 max-lg:hidden">
          {navLinks.map((ele, i) => (
            <NavLink
              key={i}
              href={`${siteConfig.pathname}${ele.href}`}
              className="h-9 w-full content-center rounded border border-transparent px-2 capitalize outline-none ring-focus hover:bg-muted-3 focus-visible:ring-2 active:bg-muted-4 data-[active=true]:border-primary-8 data-[active=true]:bg-primary-3 data-[active=true]:text-primary-11"
            >
              {ele.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

AppBar.displayName = displayName;
