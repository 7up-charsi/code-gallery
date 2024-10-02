'use client';

import { useScroll } from '@typeweave/react/use-scroll';
import React from 'react';

interface AppBarProps {
  children: React.ReactNode;
}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const { children } = props;

  const [{ isAtTop, scrollY }] = useScroll();

  return (
    <header
      data-shrink={scrollY >= 400}
      data-scrolled={isAtTop === null ? false : !isAtTop}
      className="bg-background group fixed left-0 top-0 w-full data-[scrolled=true]:shadow-md"
    >
      {children}
    </header>
  );
};

AppBar.displayName = displayName;
