import { ThemeSwitcher } from '@repo/ui/theme-switcher';
import { navLinks } from '../_constants/nav-links';
import { MobileDrawer } from './mobile-drawer';
import { Branding } from '@repo/ui/branding';
import { siteConfig } from '../site.config';
import { NavLink } from './nav-link';
import React from 'react';

const displayName = 'AppBarContent';

export const AppBarContent = () => {
  return (
    <div className="flex h-16 items-center gap-3 px-5 md:px-8">
      <Branding href={siteConfig.pathname} className="font-logo">
        {siteConfig.name}
      </Branding>

      <div className="grow"></div>

      <nav className="flex items-center gap-2 max-lg:hidden">
        {navLinks.map((ele, i) => (
          <NavLink
            key={i}
            href={`${siteConfig.pathname}${ele.href}`}
            className="ring-focus before:bg-primary-9 hover:bg-muted-3 active:bg-muted-4 relative h-9 content-center rounded px-4 capitalize outline-none before:absolute before:bottom-0 before:left-1/2 before:hidden before:h-1 before:w-1/3 before:-translate-x-1/2 before:rounded-full focus-visible:ring-2 data-[active=true]:before:block"
          >
            {ele.label}
          </NavLink>
        ))}
      </nav>

      <ThemeSwitcher />

      <MobileDrawer />
    </div>
  );
};

AppBarContent.displayName = displayName;
