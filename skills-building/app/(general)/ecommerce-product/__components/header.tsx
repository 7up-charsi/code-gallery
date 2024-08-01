'use client';

import {
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from '@typeweave/react/drawer';
import { AvatarImage, AvatarRoot } from '@typeweave/react/avatar';
import { PortfolioHeader } from '@/components/portfolio-header';
import { useIsMounted } from '@typeweave/react/use-is-mounted';
import { Skeleton } from '@typeweave/react/skeleton';
import { navLinks } from '../__constants/nav-links';
import { Button } from '@typeweave/react/button';
import { Branding } from '@/components/branding';
import { ThemeSwitcher } from './theme-switcher';
import { MenuIcon, XIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { siteConfig } from '../site.config';
import { Cart } from './cart';
import Link from 'next/link';
import React from 'react';

interface HeaderProps {}

const displayName = 'Header';

export const Header = (props: HeaderProps) => {
  const {} = props;

  const isMounted = useIsMounted();
  const pathname = usePathname();

  const headerRef = React.useRef<HTMLElement>(null);

  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const scrollHandler = () => {
      const currentScroll = scrollY;

      const bodyScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

      if (headerRef.current) {
        headerRef.current.style.top = `-${Math.min(40, currentScroll)}px`;
      }

      if (bodyScroll) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    scrollHandler();

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      data-scroll={isScrolled}
      className="fixed left-0 right-0 top-0 z-50 mx-auto max-w-screen-2xl bg-background data-[scroll=true]:shadow-md"
    >
      <PortfolioHeader />

      <div className="flex h-16 items-center gap-5 border-b border-muted-6 px-5 md:px-10">
        {!isMounted && (
          <>
            <Skeleton
              variant="rounded"
              className="h-9 w-9 lg:hidden"
            />
          </>
        )}

        {isMounted && (
          <DrawerRoot>
            <DrawerTrigger>
              <Button
                isIconOnly
                aria-label="menu"
                className="lg:hidden"
              >
                <MenuIcon />
              </Button>
            </DrawerTrigger>

            <DrawerPortal>
              <DrawerOverlay className="lg:hidden" />
              <DrawerContent>
                <div className="relative flex h-14 items-center justify-center border-b border-muted-6 lg:hidden">
                  <Branding href={siteConfig.pathname}>
                    {siteConfig.name}
                  </Branding>

                  <DrawerClose>
                    <Button
                      isIconOnly
                      aria-label="menu close"
                      variant="text"
                      color="danger"
                      className="absolute right-3"
                    >
                      <XIcon />
                    </Button>
                  </DrawerClose>
                </div>

                <nav className="mt-5 flex flex-col gap-1">
                  {navLinks.map((ele) => (
                    <Link
                      key={ele}
                      href={`${siteConfig.pathname}/${ele}`}
                      data-active={pathname === `/${ele}`}
                      className="flex h-10 select-none items-center border-r-8 border-transparent px-5 font-medium outline-none hover:bg-muted-3 focus-visible:bg-muted-4 active:bg-muted-5 data-[active=true]:border-primary-8"
                    >
                      <span className="capitalize">{ele}</span>
                    </Link>
                  ))}
                </nav>

                <div className="mt-5 px-5">
                  <ThemeSwitcher className="w-full" />
                </div>
              </DrawerContent>
            </DrawerPortal>
          </DrawerRoot>
        )}

        <Branding href={siteConfig.pathname}>
          {siteConfig.name}
        </Branding>

        <nav className="flex h-full gap-1 max-lg:hidden">
          {navLinks.map((ele) => (
            <Link
              key={ele}
              href={`${siteConfig.pathname}/${ele}`}
              data-active={pathname === `/${ele}`}
              className="flex h-full select-none items-center border-b-2 border-transparent px-5 text-muted-11/70 outline-none hover:border-primary-6 hover:text-muted-11 focus-visible:border-primary-8 focus-visible:text-muted-11 active:border-primary-7 data-[active=true]:border-primary-8 data-[active=true]:text-muted-11 data-[active=true]:focus-visible:bg-muted-3"
            >
              <span className="capitalize">{ele}</span>
            </Link>
          ))}
        </nav>

        <div className="grow"></div>

        <Cart />

        {!isMounted && (
          <Skeleton variant="rounded" className="h-9 w-[108px]" />
        )}
        {isMounted && <ThemeSwitcher className="max-lg:hidden" />}

        <AvatarRoot>
          <AvatarImage src="https://avatar.iran.liara.run/public/48" />
        </AvatarRoot>
      </div>
    </header>
  );
};

Header.displayName = displayName;
