import { ThemeSwitcher } from '@repo/ui/theme-switcher';
import { portfolio } from '@repo/meta';
import Link from 'next/link';
import React from 'react';

interface AppBarContentProps {}

const displayName = 'AppBarContent';

export const AppBarContent = (props: AppBarContentProps) => {
  const {} = props;

  return (
    <div className="flex h-16 items-center gap-3 px-5 md:px-8">
      <Link
        href={portfolio.url}
        className="text-muted-12 ring-focus flex items-center gap-1 rounded text-xl uppercase outline-none ring-offset-1 focus-visible:ring-2"
      >
        {portfolio.name}
      </Link>

      <div className="grow"></div>

      <ThemeSwitcher />
    </div>
  );
};

AppBarContent.displayName = displayName;
