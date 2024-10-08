'use client';

import {
  Building2Icon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  ListTodoIcon,
  UserCogIcon,
  UsersIcon,
} from 'lucide-react';
import {
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from '@typeweave/react/tooltip';
import { Button } from '@typeweave/react/button';
import { siteConfig } from '../site.config';
import { NavLink } from './nav-link';
import React from 'react';

const displayName = 'SideBar';

export const SideBar = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    const sideBarLink = document.querySelector(
      '#side-bar-nav a',
    ) as HTMLAnchorElement | null;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      if (e.ctrlKey && e.key === 'm') {
        e.preventDefault();

        setIsExpanded((prev) => {
          const isOpen = !prev;

          if (isOpen) {
            sideBarLink?.focus();
          }

          return isOpen;
        });
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <aside
      data-expanded={isExpanded}
      className="border-muted-6 bg-background fixed left-0 top-[65px] z-50 h-[calc(100vh-65px)] w-[var(--side-bar-collapsed-width)] border-r transition-[width] data-[expanded=true]:w-[230px] max-md:data-[expanded=true]:shadow-[4px_0px_6px_-1px_rgb(0_0_0_/_0.1),_0_2px_4px_-2px_rgb(0_0_0_/_0.1)] md:sticky"
    >
      <Button
        isIconOnly
        aria-label="shrink side bar"
        size="sm"
        color="primary"
        variant="solid"
        onPress={() => {
          setIsExpanded((prev) => !prev);
        }}
        className="absolute right-0 top-1/2 size-5 -translate-y-1/2 translate-x-1/2 rounded-full"
      >
        {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </Button>
      <nav
        id="side-bar-nav"
        className="flex flex-col gap-3 px-3 py-3"
      >
        {[
          {
            label: 'home',
            href: '/',
            icon: <HomeIcon size={20} />,
          },
          {
            label: 'users',
            href: '/users',
            icon: <UsersIcon size={20} />,
          },
          {
            label: 'organizations',
            href: '/organizations',
            icon: <Building2Icon size={20} />,
          },
          {
            label: 'calendar',
            href: '/calendar',
            icon: <CalendarIcon size={20} />,
          },
          {
            label: 'todo',
            href: '/todo',
            icon: <ListTodoIcon size={20} />,
          },
          {
            label: 'settings',
            href: '/settings',
            icon: <UserCogIcon size={20} />,
          },
        ].map(({ icon, label, href }, i) => (
          <TooltipRoot key={i} disabled={isExpanded}>
            <TooltipTrigger>
              <NavLink
                href={`${siteConfig.pathname}/skill-demo${href}`}
                data-expanded={isExpanded}
                className="ring-focus before:bg-primary-9 hover:bg-muted-3 active:bg-muted-4 group relative grid h-12 w-full grid-flow-col grid-cols-[48px] items-center overflow-hidden whitespace-nowrap rounded capitalize outline-none before:absolute before:bottom-0 before:left-0 before:top-1/2 before:hidden before:h-1/3 before:w-1 before:-translate-y-1/2 before:rounded-full focus-visible:ring-2 data-[expanded=true]:grid-cols-[48px_1fr] data-[active=true]:before:block"
              >
                <span className="group-data-[active=true]:text-muted-12 mx-auto">
                  {icon}
                </span>
                <span>{label}</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent
                placement="right"
                mainOffset={20}
                className="bg-black capitalize text-white"
              >
                {label}
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        ))}
      </nav>
    </aside>
  );
};

SideBar.displayName = displayName;
