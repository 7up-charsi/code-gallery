'use client';

import { useScroll } from '@typeweave/react/use-scroll';
import React from 'react';

interface AppBarProps {
  children?: React.ReactNode;
}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const { children } = props;

  const isHideRef = React.useRef(false);

  const [{ dirY, scrollY, deltaY }] = useScroll();

  if (dirY === 1 && scrollY > 400 && deltaY >= 100) {
    isHideRef.current = true;
  } else if (dirY === -1 && deltaY >= 50) {
    isHideRef.current = false;
  }

  return (
    <header
      data-scrolled={scrollY >= 40}
      data-sticked={scrollY >= 40}
      data-hide={isHideRef.current}
      className="group sticky -top-10 left-0 right-0 mx-auto max-w-screen-2xl transition-transform data-[hide=true]:-translate-y-full data-[sticked=true]:bg-background data-[hide=false]:data-[scrolled=true]:shadow-md"
    >
      {children}
    </header>
  );
};

AppBar.displayName = displayName;
