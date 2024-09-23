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
      style={{ top: Math.min(40, scrollY) * -1 }}
      data-shrink={scrollY >= 400}
      data-scrolled={isAtTop === null ? false : !isAtTop}
      className="border-muted-6 bg-background group fixed left-0 right-0 top-0 border-b data-[scrolled=true]:shadow-md"
    >
      {children}
    </header>
  );
};

AppBar.displayName = displayName;