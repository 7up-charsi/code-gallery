import {
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from '@typeweave/react/drawer';
import { MapPinIcon, MenuIcon, XIcon } from 'lucide-react';
import { CurrencySwitcher } from './currency-switcher';
import { FavoriteButton } from './favorite-button';
import { Button } from '@typeweave/react/button';
import { LangSwitcher } from './lang-switcher';
import { address } from '@/constants/common';
import { CartButton } from './cart-button';
import { Branding } from './branding';
import { NavLink } from './nav-link';
import React from 'react';

interface AppBarProps {}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const {} = props;

  return (
    <header className="grid grid-cols-[1fr_auto_auto_auto] grid-rows-[theme(spacing.16)_auto] items-center gap-1 px-5 lg:px-10">
      <Branding />

      <CartButton />
      <FavoriteButton />

      <DrawerRoot>
        <DrawerTrigger>
          <Button
            variant="text"
            isIconOnly
            aria-label="menu"
            className="text-2xl"
          >
            <MenuIcon />
          </Button>
        </DrawerTrigger>

        <DrawerPortal>
          <DrawerOverlay variant="blur" className="lg:hidden" />

          <DrawerContent className="flex flex-col px-5 lg:hidden">
            <div className="flex h-16 items-center justify-between gap-2">
              <Branding />

              <DrawerClose>
                <Button
                  isIconOnly
                  aria-label="close menu"
                  variant="text"
                  color="danger"
                >
                  <XIcon />
                </Button>
              </DrawerClose>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <LangSwitcher />
              <CurrencySwitcher />
            </div>

            <nav className="mt-3 flex flex-col">
              {[
                'home',
                'shop',
                'pages',
                'blog',
                'about',
                'contact',
              ].map((ele, i) => (
                <NavLink
                  href={i === 0 ? '/' : ele}
                  key={i}
                  className="relative flex h-10 w-full items-center overflow-hidden rounded px-5 capitalize before:absolute before:left-0 before:hidden before:h-5 before:w-1 before:rounded-full before:bg-primary-9 hover:bg-muted-3 active:bg-muted-4 data-[active=true]:border-l-primary-8 data-[active=true]:before:block"
                >
                  {ele}
                </NavLink>
              ))}
            </nav>

            <address className="mb-3 mt-auto rounded bg-muted-2 px-3 py-2 text-xs leading-loose">
              <MapPinIcon
                size={20}
                className="mr-1 inline-block text-danger-11/70"
              />{' '}
              <span>{address}</span>
            </address>

            <Button className="mb-3 w-full" color="primary">
              Signin/Signup
            </Button>
          </DrawerContent>
        </DrawerPortal>
      </DrawerRoot>
    </header>
  );
};

AppBar.displayName = displayName;
