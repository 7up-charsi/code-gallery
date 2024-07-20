import {
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
import { CartButton } from './cart-button';
import { Branding } from './branding';
import { NavLink } from './nav-link';
import React from 'react';

interface AppBarProps {}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const {} = props;

  return (
    <header className="grid grid-cols-[1fr_auto_auto_auto] grid-rows-[theme(spacing.16)_auto] items-center gap-1 px-7">
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
          <DrawerOverlay variant="blur" />

          <DrawerContent className="flex flex-col px-5">
            <div className="flex h-16 items-center justify-between gap-2">
              <Branding />

              <Button
                isIconOnly
                aria-label="close menu"
                variant="text"
                color="danger"
              >
                <XIcon />
              </Button>
            </div>

            <hr className="my-1 border-muted-6" />

            <p className="mt-3 rounded bg-muted-2 px-3 py-2 text-sm leading-loose">
              <MapPinIcon
                size={20}
                className="mr-1 inline-block text-danger-11/70"
              />{' '}
              <span>Lincoln- 344, Illinois, Chicago, USA</span>
            </p>

            <div className="mt-3 flex gap-2">
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

            <Button className="mb-3 mt-auto w-full" color="primary">
              signin/signup
            </Button>
          </DrawerContent>
        </DrawerPortal>
      </DrawerRoot>
    </header>
  );
};

AppBar.displayName = displayName;
