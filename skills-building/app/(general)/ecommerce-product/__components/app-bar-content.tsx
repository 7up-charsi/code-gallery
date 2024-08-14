import { AvatarImage, AvatarRoot } from '@typeweave/react/avatar';
import { PortfolioHeader } from '@/components/portfolio-header';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Branding } from '@/components/branding';
import { siteConfig } from '../site.config';
import { Cart } from './cart';
import React from 'react';

interface AppBarContentProps {}

const displayName = 'AppBarContent';

export const AppBarContent = (props: AppBarContentProps) => {
  const {} = props;

  return (
    <>
      <PortfolioHeader />

      <div className="flex h-16 items-center gap-3 px-5 md:px-8">
        <Branding href={siteConfig.pathname}>
          {siteConfig.name}
        </Branding>

        <div className="grow"></div>

        <Cart />

        <ThemeSwitcher />

        <AvatarRoot>
          <AvatarImage src="https://avatar.iran.liara.run/public/48" />
        </AvatarRoot>
      </div>
    </>
  );
};

AppBarContent.displayName = displayName;
