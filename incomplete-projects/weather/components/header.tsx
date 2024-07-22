import React from 'react';
import { Branding } from './branding';
import { SearchBar } from './search-bar';

interface HeaderProps {}

const displayName = 'Header';

export const Header = (props: HeaderProps) => {
  const {} = props;

  return (
    <header className="sticky left-0 top-0 z-50 flex w-full flex-col gap-3 bg-background px-5 py-4">
      <div className="w-full">
        <Branding />
      </div>

      <SearchBar />
    </header>
  );
};

Header.displayName = displayName;
