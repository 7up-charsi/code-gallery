import { Branding, PortfolioHeader, ThemeSwitcher } from '@repo/ui';
import { siteConfig } from '@/config/site';
import React from 'react';

interface AppBarContentProps {}

const displayName = 'AppBarContent';

export const AppBarContent = (props: AppBarContentProps) => {
  const {} = props;

  return (
    <>
      <PortfolioHeader />

      <div className="flex h-16 items-center px-5 transition-colors md:px-8">
        <Branding href="/">{siteConfig.name}</Branding>

        <div className="grow"></div>

        <ThemeSwitcher />
      </div>
    </>
  );
};

AppBarContent.displayName = displayName;
