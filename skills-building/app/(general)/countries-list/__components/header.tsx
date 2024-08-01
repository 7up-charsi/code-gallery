'use client';

import { PortfolioHeader } from '@/components/portfolio-header';
import { Branding } from '@/components/branding';
import { ThemeSwitcher } from './theme-switcher';
import { SearchRegion } from './search-region';
import { siteConfig } from '../site.config';
import { SearchName } from './search-name';
import React from 'react';

interface HeaderProps {}

const displayName = 'Header';

export const Header = (props: HeaderProps) => {
  const {} = props;

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [shrink, setShrink] = React.useState(false);

  React.useEffect(() => {
    let lastScrolled = 0;
    let lastScrollDirection = 0; // 1 is down and -1 is up
    let scrollTraveled = 0;

    const scrollHandler = () => {
      const currentScroll = scrollY;

      if (document.body.getBoundingClientRect().top < 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const newScrollDirection =
        currentScroll > lastScrolled ? 1 : -1;

      if (lastScrollDirection === -1 && newScrollDirection === 1) {
        scrollTraveled = 0;
      } else if (
        lastScrollDirection === 1 &&
        newScrollDirection === -1
      ) {
        scrollTraveled = 0;
      }

      scrollTraveled += Math.abs(currentScroll - lastScrolled);

      if (scrollTraveled >= 100 && newScrollDirection === 1) {
        setShrink(true);
      } else if (scrollTraveled >= 50 && newScrollDirection === -1) {
        setShrink(false);
      }

      lastScrolled = currentScroll;
      lastScrollDirection = newScrollDirection;
    };

    scrollHandler();

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <header
      data-scrolled={isScrolled}
      data-shrink={shrink}
      className="fixed left-0 right-0 top-0 z-50 mx-auto max-w-screen-2xl transition-all data-[shrink=true]:-top-[calc(40px+12px+36px)] data-[scrolled=true]:shadow-md 2xl:border-x 2xl:border-muted-6"
    >
      <PortfolioHeader />

      <div className="grid grid-cols-2 items-center gap-3 bg-background px-5 py-3 max-lg:grid-rows-[auto_auto] lg:grid-cols-[auto_1fr_auto] lg:px-10">
        <Branding href={siteConfig.pathname}>
          {siteConfig.name}
        </Branding>

        <div className="flex justify-end">
          <ThemeSwitcher />
        </div>

        <search className="col-span-2 grid grid-cols-2 items-center justify-center gap-3 md:grid-cols-[2fr_1fr] lg:col-span-1 lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2 lg:grid-cols-[auto_auto] lg:justify-end">
          <SearchName />
          <SearchRegion />
        </search>
      </div>
    </header>
  );
};

Header.displayName = displayName;
