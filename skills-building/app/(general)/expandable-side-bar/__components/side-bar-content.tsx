import { siteConfig } from '../site.config';
import { HomeIcon } from 'lucide-react';
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
      className="grid grid-cols-[48px] gap-3 px-5 data-[expanded=true]:grid-cols-[48px_1fr] md:px-3 md:py-3"
    >
      {[
        { label: 'home', href: '/', icon: <HomeIcon /> },
        { label: 'page 1', href: '/page1', icon: <HomeIcon /> },
        { label: 'page 2', href: '/page2', icon: <HomeIcon /> },
        { label: 'page 3', href: '/page3', icon: <HomeIcon /> },
        { label: 'page 4', href: '/page4', icon: <HomeIcon /> },
        { label: 'page 5', href: '/page5', icon: <HomeIcon /> },
      ].map(({ icon, label, href }, i) => (
        <NavLink
          key={i}
          href={`${siteConfig.pathname}${href}`}
          data-expanded={isExpanded}
          className="grid h-12 w-full grid-cols-subgrid items-center whitespace-nowrap rounded border border-transparent capitalize outline-none ring-focus hover:bg-muted-3 focus-visible:ring-2 active:bg-muted-4 data-[expanded=true]:col-span-2 data-[active=true]:border-primary-8 data-[active=true]:bg-primary-3 data-[active=true]:text-primary-11"
        >
          <span
            data-expanded={isExpanded}
            className="mx-auto border-transparent data-[expanded=true]:border-r"
          >
            {icon}
          </span>
          {isExpanded && <span>{label}</span>}
        </NavLink>
      ))}
    </nav>
  );
};

SideBarContent.displayName = displayName;
