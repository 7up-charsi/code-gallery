import { ThemeSwitcher } from './theme-switcher';
import author from '@repo/meta/author.json';
import Link from 'next/link';
import React from 'react';

interface HeaderProps {}

const displayName = 'Header';

export const Header = (props: HeaderProps) => {
  const {} = props;

  return (
    <header className="flex h-16 items-center justify-center border-b border-muted-6 px-5">
      <Link
        href={author.portfolio}
        aria-label="go to portfolio"
        className="text-xl uppercase"
      >
        {author.name}
      </Link>

      <div className="grow"></div>

      <ThemeSwitcher />
    </header>
  );
};

Header.displayName = displayName;
