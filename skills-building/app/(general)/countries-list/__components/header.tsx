import { brandingStyles, PortfolioHeader } from '@repo/ui';
import { ThemeSwitcher } from './theme-switcher';
import { siteConfig } from '../site.config';
import Link from 'next/link';
import React from 'react';

interface HeaderProps {}

const displayName = 'Header';

export const Header = (props: HeaderProps) => {
  const {} = props;

  return (
    <header className="">
      <PortfolioHeader linkComp={Link} />

      <div className="flex h-16 items-center border-b border-muted-6 px-5">
        <Link href={siteConfig.pathname} className={brandingStyles}>
          {siteConfig.name}
        </Link>

        <div className="grow"></div>

        <ThemeSwitcher />
      </div>
    </header>
  );
};

Header.displayName = displayName;
