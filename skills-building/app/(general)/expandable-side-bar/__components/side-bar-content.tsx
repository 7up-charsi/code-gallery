import { siteConfig } from '../site.config';
import { HomeIcon } from 'lucide-react';
import { NavLink } from './nav-link';
import Link from 'next/link';
import React from 'react';

interface SideBarContentProps {
  expanded: boolean;
}

const displayName = 'SideBarContent';

export const SideBarContent = (props: SideBarContentProps) => {
  const { expanded } = props;

  return (
    <nav
      data-expanded={expanded}
      className="grid grid-cols-1 gap-2 px-5 data-[expanded=true]:grid-cols-[50px_1fr]"
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
          className="col-span-2 grid h-12 w-full grid-cols-subgrid items-center whitespace-nowrap rounded border border-transparent px-3 capitalize hover:bg-muted-3 active:bg-muted-4 data-[active=true]:border data-[active=true]:border-primary-8 data-[active=true]:bg-primary-3 data-[active=true]:text-primary-11"
        >
          {icon}
          {expanded && <span>{label}</span>}
        </NavLink>
      ))}
    </nav>
  );
};

SideBarContent.displayName = displayName;
