import { navLinks } from '@/constants/nav-links';
import { phoneNumber } from '@/constants/common';
import { PhoneCallIcon } from 'lucide-react';
import { NavLink } from './nav-link';
import React from 'react';

interface NavBarProps {}

const displayName = 'NavBar';

export const NavBar = (props: NavBarProps) => {
  const {} = props;

  return (
    <div className="flex h-14 items-center bg-muted-10 px-10 max-lg:hidden">
      <nav className="flex gap-1">
        {navLinks.map(({ href, label }, i) => (
          <NavLink
            href={href}
            key={i}
            className="relative flex h-9 items-center justify-center overflow-hidden rounded px-3 text-sm capitalize text-white/60 outline-none before:absolute before:bottom-0 before:hidden before:h-1 before:w-5 before:rounded-full before:bg-white hover:bg-white/15 hover:text-white focus-visible:bg-white/15 focus-visible:text-white active:bg-white/25 data-[active=true]:text-white data-[active=true]:before:block"
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="grow"></div>

      <a href={`tel:${phoneNumber}`} className="text-white">
        <PhoneCallIcon size={20} className="mr-2 inline-block" />
        <span>{phoneNumber}</span>
      </a>
    </div>
  );
};

NavBar.displayName = displayName;
