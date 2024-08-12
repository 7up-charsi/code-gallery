import { PortfolioHeader } from '@/components/portfolio-header';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Branding } from '@/components/branding';
import { SearchRegion } from './search-region';
import { siteConfig } from '../site.config';
import { SearchName } from './search-name';
import React from 'react';

interface AppBarContentProps {}

const displayName = 'AppBarContent';

export const AppBarContent = (props: AppBarContentProps) => {
  const {} = props;

  return (
    <>
      <PortfolioHeader />

      <div className="grid grid-cols-2 items-center gap-3 bg-background px-5 py-3 max-lg:grid-rows-[auto_auto] lg:grid-cols-[auto_1fr_auto] lg:px-10">
        <Branding href={siteConfig.pathname}>
          {siteConfig.name}
        </Branding>

        <div className="flex justify-end">
          <ThemeSwitcher />
        </div>

        <search className="col-span-2 grid grid-cols-2 items-center justify-center gap-3 md:grid-cols-[2fr_1fr] lg:col-span-1 lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2 lg:grid-cols-[auto_auto] lg:justify-end">
          <SearchName />
          <SearchRegion />
        </search>
      </div>
    </>
  );
};

AppBarContent.displayName = displayName;