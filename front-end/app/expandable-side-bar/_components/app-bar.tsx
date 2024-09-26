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
      className="border-muted-6 bg-background/70 sticky left-0 right-0 top-0 border-b backdrop-blur-sm data-[scrolled=true]:shadow-md md:top-0"
    >
      {children}
    </header>
  );
};

AppBar.displayName = displayName;
