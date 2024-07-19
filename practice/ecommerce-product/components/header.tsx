'use client';

import {
  AvatarImage,
  AvatarRoot,
  Button,
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
  Skeleton,
  useIsMounted,
} from '@typeweave/react';
import { ThemeSwitcher } from './theme-switcher';
import { MenuIcon, XIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Branding } from './branding';
import { Cart } from './cart';
import Link from 'next/link';
import React from 'react';

interface HeaderProps {}

const displayName = 'Header';

export const Header = (props: HeaderProps) => {
  const {} = props;

  const isMounted = useIsMounted();
  const pathname = usePathname();

  return (
    <header className="mx-auto flex h-16 max-w-screen-lg items-center gap-5 border-b border-muted-6 px-5 lg:h-20">
      {!isMounted && (
        <>
          <Skeleton variant="rounded" className="h-9 w-9 lg:hidden" />
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
                <Branding />

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
                {[
                  'collections',
                  'men',
                  'women',
                  'about',
                  'contact',
                ].map((ele) => (
                  <Link
                    key={ele}
                    href={`/${ele}`}
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

      <Branding />

      <nav className="flex h-full gap-1 max-lg:hidden">
        {['collections', 'men', 'women', 'about', 'contact'].map(
          (ele) => (
            <Link
              key={ele}
              href={`/${ele}`}
              data-active={pathname === `/${ele}`}
              className="flex h-full select-none items-center border-b-2 border-transparent px-5 text-muted-11/70 outline-none hover:border-primary-6 hover:text-muted-11 focus-visible:border-primary-8 focus-visible:text-muted-11 active:border-primary-7 data-[active=true]:border-primary-8 data-[active=true]:text-muted-11 data-[active=true]:focus-visible:bg-muted-3"
            >
              <span className="capitalize">{ele}</span>
            </Link>
          ),
        )}
      </nav>

      <div className="grow"></div>

      <Cart />

      <ThemeSwitcher className="max-lg:hidden" />

      <AvatarRoot>
        <AvatarImage src="https://avatar.iran.liara.run/public/48" />
      </AvatarRoot>
    </header>
  );
};

Header.displayName = displayName;
