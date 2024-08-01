'use client';

import { PortfolioHeader } from '@/components/portfolio-header';
import { Branding } from '@/components/branding';
import { siteConfig } from '../site.config';
import React from 'react';

interface AppBarProps {}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const {} = props;

  const [isScrolled, setIsScrolled] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);
  const headerContentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const headerOriginalHeight =
      (headerContentRef.current &&
        getComputedStyle(headerContentRef.current).height) ??
      '';

    const scrollHandler = () => {
      const bodyScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

      if (headerRef.current) {
        headerRef.current.style.top = `-${Math.min(40, bodyScroll)}px`;
      }

      if (headerContentRef.current && bodyScroll >= 100) {
        headerContentRef.current.style.height = '50px';
      } else if (headerContentRef.current && bodyScroll < 100) {
        headerContentRef.current.style.height = headerOriginalHeight;
      }

      if (bodyScroll) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    scrollHandler();

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      data-scroll={isScrolled}
      className="fixed left-0 right-0 top-0 data-[scroll=true]:shadow-md"
    >
      <PortfolioHeader />

      <div
        ref={headerContentRef}
        className="flex h-20 items-center bg-primary-4 px-5 transition-[height]"
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
