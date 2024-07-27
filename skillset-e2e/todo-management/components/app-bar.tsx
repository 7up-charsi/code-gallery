import { siteConfig } from '@/config/site';
import { AddTask } from './add-task';
import { Search } from './search';
import Link from 'next/link';
import React from 'react';

interface AppBarProps {}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const {} = props;

  return (
    <header className="grid grid-cols-1 grid-rows-[64px_auto] px-5 pb-3">
      <div className="content-center text-center">
        <Link
          href="/"
          className="text-xl font-medium capitalize text-muted-12"
        >
          {siteConfig.name}
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Search />

        <AddTask />
      </div>
    </header>
  );
};

AppBar.displayName = displayName;
