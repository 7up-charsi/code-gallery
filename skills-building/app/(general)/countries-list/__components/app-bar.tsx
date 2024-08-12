'use client';

import { useScroll } from '@typeweave/react/use-scroll';
import React from 'react';

interface AppBarProps {
  children: React.ReactNode;
}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const { children } = props;

  const [{ isAtTop }] = useScroll();

  return (
    <header
      // The null check is implemented to prevent a shadow from appearing on the initial render, as the isAtTop variable is null by default.
      data-scrolled={isAtTop === null ? false : !isAtTop}
      className="sticky -top-10 left-0 right-0 z-50 transition-transform data-[scrolled=true]:shadow-md"
    >
      {children}
    </header>
  );
};

AppBar.displayName = displayName;
