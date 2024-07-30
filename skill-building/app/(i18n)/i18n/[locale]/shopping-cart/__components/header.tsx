import { CartDrawerButton } from './cart-drawer-button';
import { LocaleChanger } from './locale-changer';
import { ThemeSwitcher } from './theme-switcher';
import { HeaderDrawer } from './header-drawer';
import { Branding } from './branding';
import React from 'react';

interface HeaderProps {}

const displayName = 'Header';

export const Header = (props: HeaderProps) => {
  const {} = props;

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-3 bg-background px-5">
      <Branding />

      <div className="grow"></div>

      <CartDrawerButton />
      <LocaleChanger className="w-40 max-lg:hidden" />
      <ThemeSwitcher className="max-lg:hidden" />
      <HeaderDrawer />
    </header>
  );
};

Header.displayName = displayName;
