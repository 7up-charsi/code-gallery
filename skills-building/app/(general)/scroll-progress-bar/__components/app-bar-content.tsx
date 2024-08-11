import { PortfolioHeader } from '@/components/portfolio-header';
import { Branding } from '@/components/branding';
import { siteConfig } from '../site.config';
import React from 'react';

interface AppBarContentProps {}

const displayName = 'AppBarContent';

export const AppBarContent = (props: AppBarContentProps) => {
  const {} = props;

  return (
    <>
      <PortfolioHeader />

      <div className="flex h-16 items-center bg-muted-2 px-5 transition-colors group-data-[sticked=true]:bg-white">
        <Branding href={siteConfig.pathname}>
          {siteConfig.name}
        </Branding>

        <div className="grow"></div>

        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="ml-2 h-7 w-10 rounded bg-black/10"
          ></div>
        ))}
      </div>
    </>
  );
};

AppBarContent.displayName = displayName;
