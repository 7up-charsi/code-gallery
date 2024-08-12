'use client';

import { PortfolioHeader } from '@/components/portfolio-header';
import { useScroll } from '@typeweave/react/use-scroll';
import { Branding } from '@/components/branding';
import { siteConfig } from '../site.config';
import React from 'react';

interface AppBarProps {}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const {} = props;

  const isShrinkedRef = React.useRef(false);
  const headerRef = React.useRef<HTMLElement>(null);

  const [{ isAtTop, scrollY }] = useScroll({
    onScrollY: ({ scrollY }) => {
      if (headerRef.current) {
        headerRef.current.style.top = `-${Math.min(40, scrollY)}px`;
      }
    },
  });

  if (scrollY >= 400) {
    isShrinkedRef.current = true;
  } else {
    isShrinkedRef.current = false;
  }

  return (
    <header
      ref={headerRef}
      data-scrolled={isAtTop === null ? false : !isAtTop}
      className="fixed left-0 right-0 top-0 data-[scrolled=true]:shadow-md"
    >
      <PortfolioHeader />

      <div
        data-shrink={isShrinkedRef.current}
        className="flex h-20 items-center bg-muted-2 px-5 transition-[height] data-[shrink=true]:h-[50px]"
      >
        <Branding href={siteConfig.pathname}>
          {siteConfig.name}
        </Branding>

        <div className="grow"></div>

        <div className="flex select-none gap-2">
          <span className="h-9 content-center rounded px-2 text-sm outline-none">
            Link 1
          </span>

          <span className="h-9 content-center rounded px-2 text-sm outline-none">
            Link 2
          </span>

          <span className="h-9 content-center rounded px-2 text-sm outline-none">
            Link 3
          </span>
        </div>
      </div>
    </header>
  );
};

AppBar.displayName = displayName;
