import { Branding, ThemeSwitcher } from '@repo/ui';
import { siteConfig } from '../site.config';
import React from 'react';

interface AppBarContentProps {}

const displayName = 'AppBarContent';

export const AppBarContent = (props: AppBarContentProps) => {
  const {} = props;

  return (
    <div className="flex h-20 items-center px-5 transition-[height] group-data-[shrink=true]:h-[50px] md:px-8">
      <Branding href={siteConfig.pathname}>
        {siteConfig.name}
      </Branding>

      <div className="grow"></div>

      <ThemeSwitcher />
    </div>
  );
};

AppBarContent.displayName = displayName;
