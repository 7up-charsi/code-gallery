import { ThemeSwitcher } from '@/components/theme-switcher';
import React from 'react';
import Link from 'next/link';

interface AppBarContentProps {}

const displayName = 'AppBarContent';

export const AppBarContent = (props: AppBarContentProps) => {
  const {} = props;

  return (
    <div className='flex h-16 items-center px-5 transition-colors md:px-8'>
      <Link
        href='/'
        className='whitespace-nowrap text-lg font-normal capitalize text-black outline-none ring-focus focus-visible:ring-2 dark:text-white'
      >
        Push notification
      </Link>

      <div className='grow'></div>

      <ThemeSwitcher />
    </div>
  );
};

AppBarContent.displayName = displayName;
