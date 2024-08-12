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
      data-scrolled={!isAtTop}
      className="sticky -top-10 left-0 right-0 z-50 mx-auto max-w-screen-2xl transition-transform data-[scrolled=true]:shadow-md"
    >
      {children}
    </header>
  );
};

AppBar.displayName = displayName;
