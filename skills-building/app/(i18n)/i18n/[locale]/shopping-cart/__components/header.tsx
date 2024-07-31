import { brandingStyles, PortfolioHeader } from '@repo/ui';
import { CartDrawerButton } from './cart-drawer-button';
import { LocaleChanger } from './locale-changer';
import { ThemeSwitcher } from './theme-switcher';
import { HeaderDrawer } from './header-drawer';
import { siteConfig } from '../site.config';
import Link from 'next/link';
import React from 'react';

interface HeaderProps {}

const displayName = 'Header';

export const Header = (props: HeaderProps) => {
  const {} = props;

  return (
    <header className="sticky top-0 z-50">
      <PortfolioHeader linkComp={Link} />

      <div className="flex h-16 items-center gap-3 bg-background px-5">
        <Link href={siteConfig.pathname} className={brandingStyles}>
          {siteConfig.name}
        </Link>

        <div className="grow"></div>

        <CartDrawerButton />
        <LocaleChanger className="w-40 max-lg:hidden" />
        <ThemeSwitcher className="max-lg:hidden" />
        <HeaderDrawer />
      </div>
    </header>
  );
};

Header.displayName = displayName;
