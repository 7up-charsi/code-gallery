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
      data-scrolled={isAtTop === null ? false : !isAtTop}
      className="border-muted-6 bg-background fixed left-0 top-0 z-50 w-full border-b data-[scrolled=true]:shadow-md"
    >
      {children}
    </header>
  );
};

AppBar.displayName = displayName;