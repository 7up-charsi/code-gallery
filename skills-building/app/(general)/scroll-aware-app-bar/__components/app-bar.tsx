'use client';

import { useScroll } from '@typeweave/react/use-scroll';
import React from 'react';

interface AppBarProps {
  children: React.ReactNode;
}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const { children } = props;

  const isHideRef = React.useRef(false);

  const [{ dirY, deltaY, isAtTop, scrollY }] = useScroll();

  if (dirY === 1 && scrollY > 400 && deltaY >= 100) {
    isHideRef.current = true;
  } else if (dirY === -1 && deltaY >= 100) {
    isHideRef.current = false;
  }

  return (
    <header
      data-hide={isHideRef.current}
      data-scrolled={isAtTop === null ? false : !isAtTop}
      className="sticky -top-10 left-0 right-0 transition-transform data-[hide=true]:-translate-y-full data-[hide=false]:data-[scrolled=true]:shadow-md"
    >
      {children}
    </header>
  );
};

AppBar.displayName = displayName;
