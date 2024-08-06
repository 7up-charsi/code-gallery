'use client';

import { PortfolioHeader } from '@/components/portfolio-header';
import { Button } from '@typeweave/react/button';
import { Branding } from '@/components/branding';
import { siteConfig } from '../site.config';
import Link from 'next/link';
import React from 'react';

interface AppBarProps {}

const displayName = 'AppBar';

const hideThreshold = 100;
const showThreshold = 30;

export const AppBar = (props: AppBarProps) => {
  const {} = props;

  const [isHidden, setIsHidden] = React.useState(false);

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
      className="fixed left-0 right-0 top-0 transition-transform data-[hide=true]:-translate-y-full"
    >
      <PortfolioHeader />

      <div className="flex h-16 items-center bg-indigo-200 px-5">
        <Branding
          href={siteConfig.pathname}
          className="font-logo text-indigo-900"
        >
          {siteConfig.name}
        </Branding>

        <div className="grow"></div>

        <div className="flex items-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Link
              key={i}
              href={`${siteConfig.pathname}/${i + 1}`}
              className="h-9 content-center rounded px-4 capitalize outline-none ring-white hover:bg-white/30 focus-visible:ring-2 active:bg-white/40"
            >
              page {i + 1}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

AppBar.displayName = displayName;
