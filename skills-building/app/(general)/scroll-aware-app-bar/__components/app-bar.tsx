'use client';

import { PortfolioHeader } from '@/components/portfolio-header';
import { Branding } from '@/components/branding';
import { siteConfig } from '../site.config';
import React from 'react';

interface AppBarProps {}

const displayName = 'AppBar';

const hideThreshold = 100;
const showThreshold = 30;

export const AppBar = (props: AppBarProps) => {
  const {} = props;

  const [isHidden, setIsHidden] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    let lastScrolled = window.scrollY;
    let lastScrollDirection = 0; // 1 is down and -1 is up scroll
    let scrollTraveled = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const newScrollDirection =
        currentScroll > lastScrolled ? 1 : -1;

      if (newScrollDirection === 1 && lastScrollDirection === -1) {
        scrollTraveled = 0; // reset if scrolling up after scrolling down
      } else if (
        newScrollDirection === -1 &&
        lastScrollDirection === 1
      ) {
        scrollTraveled = 0; // reset if scrolling down after scrolling up
      }

      scrollTraveled += Math.abs(currentScroll - lastScrolled);

      const bodyScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

      if (bodyScroll) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (
        newScrollDirection === 1 &&
        scrollTraveled >= hideThreshold
      ) {
        setIsHidden(true);
      } else if (
        newScrollDirection === -1 &&
        scrollTraveled >= showThreshold
      ) {
        setIsHidden(false);
      }

      lastScrollDirection = newScrollDirection;
      lastScrolled = currentScroll;
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      data-hide={isHidden}
      data-scrolled={isScrolled}
      className="fixed left-0 right-0 top-0 mx-auto max-w-screen-2xl transition-transform data-[hide=true]:-translate-y-full data-[hide=false]:data-[scrolled=true]:shadow-md"
    >
      <PortfolioHeader />

      <div className="flex h-16 items-center bg-muted-2 px-5">
        <Branding href={siteConfig.pathname}>
          {siteConfig.name}
        </Branding>

        <div className="grow"></div>

        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="ml-2 h-7 w-10 rounded bg-white/40"
          ></div>
        ))}
      </div>
    </header>
  );
};

AppBar.displayName = displayName;
