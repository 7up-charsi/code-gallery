import { siteConfig } from '@/config/site';
import { AddTask } from './add-task';
import Link from 'next/link';
import React from 'react';

interface AppBarProps {}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const {} = props;

  return (
    <header className="flex h-16 items-center bg-white px-5">
      <Link
        href="/"
        className="text-xl font-medium capitalize text-muted-12"
      >
        {siteConfig.name}
      </Link>

      <div className="grow"></div>

      <AddTask />
    </header>
  );
};

AppBar.displayName = displayName;
