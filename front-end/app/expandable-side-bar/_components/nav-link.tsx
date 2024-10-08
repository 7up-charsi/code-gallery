'use client';

import { DrawerLink, DrawerLinkProps } from '@repo/ui/drawer-link';
import { usePathname } from 'next/navigation';
import React from 'react';

const displayName = 'NavLink';

export const NavLink = React.forwardRef<
  HTMLAnchorElement,
  DrawerLinkProps
>((props, forwardedRef) => {
  const { href, ...restProps } = props;

  const pathname = usePathname();

  return (
    <DrawerLink
      ref={forwardedRef}
      {...restProps}
      href={href}
      data-active={
        href.replace(/\/$/, '') === pathname.replace(/\/$/, '')
      }
    />
  );
});

NavLink.displayName = displayName;
