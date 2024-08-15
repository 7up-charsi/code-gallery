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
      className="sticky -top-10 left-0 right-0 z-50 border-b border-muted-6 bg-background data-[scrolled=true]:shadow-md md:top-0"
    >
      {children}
    </header>
  );
};

AppBar.displayName = displayName;
