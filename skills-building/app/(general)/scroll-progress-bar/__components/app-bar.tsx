'use client';

import { useScroll } from '@typeweave/react/use-scroll';
import React from 'react';

interface AppBarProps {
  children?: React.ReactNode;
}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const { children } = props;

  const [{ scrollY }] = useScroll();

  return (
    <header
      data-scrolled={scrollY >= 40}
      data-sticked={scrollY >= 40}
      className="group sticky -top-10 left-0 right-0 mx-auto max-w-screen-2xl transition-transform data-[sticked=true]:bg-background data-[scrolled=true]:shadow-md"
    >
      {children}
    </header>
  );
};

AppBar.displayName = displayName;
