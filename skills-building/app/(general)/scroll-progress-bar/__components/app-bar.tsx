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

  const scroll = useScroll();

  if (scroll.dirY === 1 && scroll.y > 400 && scroll.deltaY >= 100) {
    isHideRef.current = true;
  } else if (scroll.dirY === -1 && scroll.deltaY >= 50) {
    isHideRef.current = false;
  }

  return (
    <header
      data-scrolled={!!scroll.y}
      data-sticked={scroll.y >= 40}
      data-hide={isHideRef.current}
      className="group sticky -top-10 left-0 right-0 mx-auto max-w-screen-2xl transition-transform data-[hide=true]:-translate-y-full data-[sticked=true]:bg-background data-[hide=false]:data-[scrolled=true]:shadow-md"
    >
      {children}
    </header>
  );
};

AppBar.displayName = displayName;
