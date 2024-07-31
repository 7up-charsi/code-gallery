import { PortfolioHeader } from '@/components/portfolio-header';
import { Branding } from '@/components/branding';
import { ThemeSwitcher } from './theme-switcher';
import { siteConfig } from '../site.config';
import React from 'react';

interface HeaderProps {}

const displayName = 'Header';

export const Header = (props: HeaderProps) => {
  const {} = props;

  return (
    <header className="">
      <PortfolioHeader />

      <div className="flex h-16 items-center bg-white px-5">
        <Branding href={siteConfig.pathname}>
          {siteConfig.name}
        </Branding>

        <div className="grow"></div>

        <ThemeSwitcher />
      </div>
    </header>
  );
};

Header.displayName = displayName;
