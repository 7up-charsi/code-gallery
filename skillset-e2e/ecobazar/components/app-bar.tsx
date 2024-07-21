import {
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from '@typeweave/react/drawer';
import {
  MapPinIcon,
  MenuIcon,
  PhoneCallIcon,
  XIcon,
} from 'lucide-react';
import { address, phoneNumber } from '@/constants/common';
import { CurrencySwitcher } from './currency-switcher';
import { FavoriteButton } from './favorite-button';
import { Button } from '@typeweave/react/button';
import { navLinks } from '@/constants/nav-links';
import { LangSwitcher } from './lang-switcher';
import { CartButton } from './cart-button';
import { Branding } from './branding';
import { NavLink } from './nav-link';
import Link from 'next/link';
import React from 'react';

interface AppBarProps {}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const {} = props;

  return (
    <header className="grid grid-cols-[auto_1fr_auto_auto_auto] grid-rows-[theme(spacing.16)_auto] items-center gap-1 px-5 lg:px-10">
      <Branding />

      <div className=""></div>

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

            <nav className="mt-3 flex flex-col gap-1">
              {navLinks.map(({ href, label }, i) => (
                <NavLink
                  href={href}
                  key={i}
                  className="relative flex h-10 w-full items-center overflow-hidden rounded px-5 capitalize outline-none before:absolute before:left-0 before:hidden before:h-5 before:w-1 before:rounded-full before:bg-primary-9 hover:bg-muted-4 focus-visible:bg-muted-4 active:bg-muted-5 data-[active=true]:before:block"
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3 pb-3">
              <Button
                asChild
                variant="text"
                startContent={<PhoneCallIcon size={20} />}
                className="place-self-center"
              >
                <Link href={`tel:${phoneNumber}`}>{phoneNumber}</Link>
              </Button>

              <address className="rounded bg-muted-2 px-3 py-2 text-xs leading-loose">
                <MapPinIcon
                  size={20}
                  className="mr-1 inline-block text-danger-11/70"
                />{' '}
                <span>{address}</span>
              </address>

              <Button className="w-full" color="primary">
                Signin/Signup
              </Button>
            </div>
          </DrawerContent>
        </DrawerPortal>
      </DrawerRoot>
    </header>
  );
};

AppBar.displayName = displayName;
