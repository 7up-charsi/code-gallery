'use client';

import { PortfolioHeader } from '@/components/portfolio-header';
import { navLinks } from '../__constants/nav-links';
import { Branding } from '@/components/branding';
import { siteConfig } from '../site.config';
import { NavLink } from './nav-link';
import { SideBar } from './side-bar';
import React from 'react';

interface AppBarProps {}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const {} = props;

  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const bodyScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

      if (bodyScroll) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      data-scrolled={isScrolled}
      className="sticky left-0 right-0 top-0 mx-auto max-w-screen-2xl transition-transform data-[scrolled=true]:shadow-md"
    >
      <PortfolioHeader />

      <div className="flex h-16 items-center bg-muted-2 px-5 md:px-10">
        <Branding href={siteConfig.pathname}>
          {siteConfig.name}
        </Branding>

        <div className="grow"></div>

        <SideBar />

        <nav className="flex items-center gap-1 max-lg:hidden">
          {navLinks.map((ele, i) => (
            <NavLink
              key={i}
              href={`${siteConfig.pathname}${ele.href}`}
              className="h-9 w-full content-center rounded border border-transparent px-2 capitalize outline-none ring-focus hover:bg-muted-3 focus-visible:ring-2 active:bg-muted-4 data-[active=true]:border-primary-8 data-[active=true]:bg-primary-3 data-[active=true]:text-primary-11"
            >
              {ele.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

AppBar.displayName = displayName;
