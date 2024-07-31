'use client';

import { PortfolioHeader } from '@/components/portfolio-header';
import { AnimatePresence, motion } from 'framer-motion';
import { Branding } from '@/components/branding';
import { ThemeSwitcher } from './theme-switcher';
import { SearchFields } from './search-fields';
import { siteConfig } from '../site.config';
import React from 'react';

interface HeaderProps {}

const displayName = 'Header';

export const Header = (props: HeaderProps) => {
  const {} = props;

  const [showSearch, setShowSearch] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const searchEle = document.getElementById('search')!;

    let lastScroll = 0;
    let scrollDirection = 0; // 1 is down and -1 is up

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry) {
          if (
            scrollDirection === 1 &&
            entry.intersectionRatio === 0
          ) {
            setShowSearch(true);
          }

          if (
            scrollDirection === -1 &&
            entry.intersectionRatio >= 0.1
          ) {
            setShowSearch(false);
          }
        }
      },
      {
        rootMargin: '-104px 0px 0px 0px',
        threshold: [0, 0.1],
      },
    );

    observer.observe(searchEle);

    const scrollHandler = () => {
      const currentScroll = scrollY;

      scrollDirection = currentScroll > lastScroll ? 1 : -1;

      if (document.body.getBoundingClientRect().top < 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      lastScroll = currentScroll;
    };

    scrollHandler();

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      data-scrolled={isScrolled}
      className="fixed left-0 right-0 top-0 z-50 data-[scrolled=true]:shadow-md"
    >
      <PortfolioHeader />

      <div className="relative h-16 overflow-hidden bg-white">
        <AnimatePresence initial={false}>
          {!showSearch && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ type: 'tween' }}
              className="absolute inset-0 flex items-center px-5"
            >
              <Branding href={siteConfig.pathname}>
                {siteConfig.name}
              </Branding>

              <div className="grow"></div>

              <ThemeSwitcher />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ type: 'tween' }}
              className="absolute inset-0"
            >
              <search className="grid h-full grid-cols-2 items-center gap-2 px-5">
                <SearchFields hideLabel />
              </search>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

Header.displayName = displayName;
