import {
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from '@typeweave/react/drawer';
import { Branding, PortfolioHeader, ThemeSwitcher } from '@repo/ui';
import { navLinks } from '../__constants/nav-links';
import { Button } from '@typeweave/react/button';
import { MenuIcon, XIcon } from 'lucide-react';
import { siteConfig } from '../site.config';
import { NavLink } from './nav-link';
import React from 'react';

interface AppBarContentProps {}

const displayName = 'AppBarContent';

export const AppBarContent = (props: AppBarContentProps) => {
  const {} = props;

  return (
    <>
      <PortfolioHeader />

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
              className="relative h-9 content-center rounded px-4 capitalize outline-none ring-focus before:absolute before:bottom-0 before:left-1/2 before:hidden before:h-1 before:w-1/3 before:-translate-x-1/2 before:rounded-full before:bg-primary-9 hover:bg-muted-3 focus-visible:ring-2 active:bg-muted-4 data-[active=true]:before:block"
            >
              {ele.label}
            </NavLink>
          ))}
        </nav>

        <ThemeSwitcher />

        <DrawerRoot>
          <DrawerTrigger>
            <Button
              isIconOnly
              aria-label="open menu"
              className="text-2xl lg:hidden"
            >
              <MenuIcon />
            </Button>
          </DrawerTrigger>

          <DrawerPortal>
            <DrawerOverlay />
            <DrawerContent className="px-5">
              <div className="flex h-16 items-center justify-between gap-2">
                <Branding
                  href={siteConfig.pathname}
                  className="font-logo"
                >
                  {siteConfig.name}
                </Branding>

                <Button
                  isIconOnly
                  aria-label="close menu"
                  color="danger"
                  size="sm"
                  variant="text"
                >
                  <XIcon />
                </Button>
              </div>

              <nav className="flex flex-col gap-1">
                {navLinks.map((ele, i) => (
                  <NavLink
                    key={i}
                    href={`${siteConfig.pathname}${ele.href}`}
                    className="group relative grid h-12 w-full grid-cols-[48px_1fr] items-center overflow-hidden whitespace-nowrap rounded capitalize outline-none ring-focus before:absolute before:bottom-0 before:left-0 before:top-1/2 before:hidden before:h-1/3 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-primary-9 hover:bg-muted-3 focus-visible:ring-2 active:bg-muted-4 data-[active=true]:before:block"
                  >
                    <span className="mx-auto group-data-[active=true]:text-primary-11">
                      {ele.icon}
                    </span>
                    <span>{ele.label}</span>
                  </NavLink>
                ))}
              </nav>
            </DrawerContent>
          </DrawerPortal>
        </DrawerRoot>
      </div>
    </>
  );
};

AppBarContent.displayName = displayName;
