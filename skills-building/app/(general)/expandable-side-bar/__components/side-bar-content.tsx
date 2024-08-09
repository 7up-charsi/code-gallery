import {
  Building2Icon,
  CalendarIcon,
  HomeIcon,
  ListTodoIcon,
  UserCogIcon,
  UsersIcon,
} from 'lucide-react';
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
      data-expanded={isExpanded}
      className="flex flex-col gap-3 px-5 md:px-3 md:py-3"
    >
      {[
        { label: 'home', href: '/', icon: <HomeIcon /> },
        { label: 'users', href: '/page1', icon: <UsersIcon /> },
        {
          label: 'organizations',
          href: '/page4',
          icon: <Building2Icon />,
        },
        { label: 'calendar', href: '/page2', icon: <CalendarIcon /> },
        { label: 'todo', href: '/page3', icon: <ListTodoIcon /> },

        { label: 'settings', href: '/page5', icon: <UserCogIcon /> },
      ].map(({ icon, label, href }, i) => (
        <NavLink
          key={i}
          href={`${siteConfig.pathname}${href}`}
          data-expanded={isExpanded}
          className="grid h-12 w-full grid-flow-col grid-cols-[46px] items-center overflow-hidden whitespace-nowrap rounded border border-transparent capitalize outline-none ring-focus hover:bg-muted-3 focus-visible:ring-2 active:bg-muted-4 data-[expanded=true]:grid-cols-[46px_1fr] data-[active=true]:border-primary-8 data-[active=true]:bg-primary-3 data-[active=true]:text-primary-11"
        >
          <span className="mx-auto">{icon}</span>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

SideBarContent.displayName = displayName;
