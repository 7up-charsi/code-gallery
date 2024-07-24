import {
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from '@typeweave/react/drawer';
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  XIcon,
} from 'lucide-react';
import { Button } from '@typeweave/react/button';
import { Branding } from './branding';
import { Promo } from './promo';
import React from 'react';

interface AppBarProps {}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const {} = props;

  return (
    <header className="flex h-20 flex-col">
      <Promo />

      <div className="flex grow items-center gap-3 px-5">
        <DrawerRoot>
          <DrawerTrigger>
            <Button
              isIconOnly
              aria-label="menu"
              className="text-2xl lg:hidden"
              variant="text"
            >
              <MenuIcon />
            </Button>
          </DrawerTrigger>

          <DrawerPortal>
            <DrawerOverlay className="lg:hidden" />

            <DrawerContent className="lg:hidden">
              <div className="flex h-16 items-center justify-between px-5">
                <Branding />

                <DrawerClose>
                  <Button
                    isIconOnly
                    aria-label="close menu"
                    size="sm"
                    color="danger"
                    variant="text"
                  >
                    <XIcon />
                  </Button>
                </DrawerClose>
              </div>
            </DrawerContent>
          </DrawerPortal>
        </DrawerRoot>

        <Branding />

        <div className="grow"></div>

        <Button
          isIconOnly
          aria-label="search"
          variant="text"
          className="text-xl"
        >
          <SearchIcon />
        </Button>

        <Button
          isIconOnly
          aria-label="shopping cart"
          variant="text"
          className="text-xl"
        >
          <ShoppingCartIcon />
        </Button>

        <Button
          isIconOnly
          aria-label="user"
          variant="text"
          className="text-xl"
        >
          <UserCircleIcon />
        </Button>
      </div>
    </header>
  );
};

AppBar.displayName = displayName;
