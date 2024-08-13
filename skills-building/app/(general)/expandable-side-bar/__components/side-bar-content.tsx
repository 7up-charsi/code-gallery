import {
  Building2Icon,
  CalendarIcon,
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
import { siteConfig } from '../site.config';
import { NavLink } from './nav-link';
import React from 'react';

interface SideBarContentProps {
  isExpanded: boolean;
}

const displayName = 'SideBarContent';

export const SideBarContent = (props: SideBarContentProps) => {
  const { isExpanded } = props;

  return (
    <nav
      id="side-bar-nav"
      data-expanded={isExpanded}
      className="flex flex-col gap-3 px-5 md:px-3 md:py-3"
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
              href={`${siteConfig.pathname}${href}`}
              data-expanded={isExpanded}
              className="group relative grid h-12 w-full grid-flow-col grid-cols-[48px] items-center overflow-hidden whitespace-nowrap rounded capitalize outline-none ring-focus before:absolute before:bottom-0 before:left-0 before:top-1/2 before:hidden before:h-1/3 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-primary-9 hover:bg-muted-3 focus-visible:ring-2 active:bg-muted-4 data-[expanded=true]:grid-cols-[48px_1fr] data-[active=true]:before:block"
            >
              <span className="mx-auto group-data-[active=true]:text-primary-11">
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
  );
};

SideBarContent.displayName = displayName;
