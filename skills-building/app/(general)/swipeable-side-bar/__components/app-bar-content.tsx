import { PortfolioHeader } from '@/components/portfolio-header';
import { navLinks } from '../__constants/nav-links';
import { Branding } from '@/components/branding';
import { siteConfig } from '../site.config';
import { SideBar } from './side-bar';
import { NavLink } from './nav-link';
import React from 'react';

interface AppBarContentProps {}

const displayName = 'AppBarContent';

export const AppBarContent = (props: AppBarContentProps) => {
  const {} = props;

  return (
    <>
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
    </>
  );
};

AppBarContent.displayName = displayName;
