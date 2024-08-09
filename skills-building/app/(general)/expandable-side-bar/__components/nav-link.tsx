'use client';

import { usePathname } from 'next/navigation';
import Link, { LinkProps } from 'next/link';
import React from 'react';

interface NavLinkProps extends LinkProps {
  className?: string;
  children?: React.ReactNode;
  href: string;
}

const displayName = 'NavLink';

export const NavLink = React.forwardRef<
  HTMLAnchorElement,
  NavLinkProps
>((props, forwardedRef) => {
  const { href, ...restProps } = props;

  const pathname = usePathname();

  return (
    <Link
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
