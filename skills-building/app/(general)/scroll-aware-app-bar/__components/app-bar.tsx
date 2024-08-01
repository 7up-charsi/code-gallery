'use client';

import { PortfolioHeader } from '@/components/portfolio-header';
import { Branding } from '@/components/branding';
import { siteConfig } from '../site.config';
import { twMerge } from 'tailwind-merge';
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

    const handler = () => {
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

    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
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