import { ThemeSwitcher } from '@repo/ui/theme-switcher';
import { Branding } from '@repo/ui/branding';
import { siteConfig } from '../site.config';
import React from 'react';

const displayName = 'AppBarContent';

export const AppBarContent = () => {
  return (
    <div className="flex h-16 items-center px-5 md:px-8">
      <Branding href={siteConfig.pathname}>
        {siteConfig.name}
      </Branding>

      <div className="grow"></div>

      <ThemeSwitcher />
    </div>
  );
};

AppBarContent.displayName = displayName;
