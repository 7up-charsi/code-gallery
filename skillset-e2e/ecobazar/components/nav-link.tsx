'use client';

import { usePathname } from 'next/navigation';
import Link, { LinkProps } from 'next/link';
import React from 'react';

interface NavLinkProps extends LinkProps {
  children?: React.ReactNode;
  className?: string;
}

const displayName = 'NavLink';

export const NavLink = (props: NavLinkProps) => {
  const { href, ...restProps } = props;

  const pathname = usePathname();

  return (
    <Link
      href={href}
      {...restProps}
      data-active={href === pathname}
    />
  );
};

NavLink.displayName = displayName;
