import { ThemeSwitcher } from '@repo/ui/theme-switcher';
import { Branding } from '@repo/ui/branding';
import { portfolio } from '@repo/meta';
import React from 'react';

interface AppBarContentProps {}

const displayName = 'AppBarContent';

export const AppBarContent = (props: AppBarContentProps) => {
  const {} = props;

  return (
    <div className="flex h-16 items-center gap-3 px-5 md:px-8">
      <Branding href={portfolio.url}>{portfolio.name}</Branding>

      <div className="grow"></div>

      <ThemeSwitcher />
    </div>
  );
};

AppBarContent.displayName = displayName;
