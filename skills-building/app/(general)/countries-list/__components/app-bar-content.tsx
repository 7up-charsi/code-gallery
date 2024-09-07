import { PortfolioHeader, ThemeSwitcher } from '@repo/ui';
import { siteConfig } from '../site.config';
import { Branding } from '@repo/ui';
import { Search } from './search';
import React from 'react';

interface AppBarContentProps {}

const displayName = 'AppBarContent';

export const AppBarContent = (props: AppBarContentProps) => {
  const {} = props;

  return (
    <>
      <PortfolioHeader />

      <div className="bg-background grid grid-cols-2 items-center gap-3 px-5 py-3 max-lg:grid-rows-[auto_auto] md:px-8 lg:grid-cols-[auto_1fr_auto]">
        <Branding href={siteConfig.pathname}>
          {siteConfig.name}
        </Branding>

        <div className="flex justify-end">
          <ThemeSwitcher />
        </div>

        <React.Suspense>
          <Search />
        </React.Suspense>
      </div>
    </>
  );
};

AppBarContent.displayName = displayName;
