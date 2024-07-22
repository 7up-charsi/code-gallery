'use client';

import { useCustomPathname } from '@/hooks/use-custom-pathname';
import Link, { LinkProps } from 'next/link';
import React from 'react';

interface NavLinkProps extends LinkProps {
  children?: React.ReactNode;
  className?: string;
}

const displayName = 'NavLink';

export const NavLink = (props: NavLinkProps) => {
  const { href, ...restProps } = props;

  const pathname = useCustomPathname();

  return (
    <Link
      href={href}
      {...restProps}
      data-active={href === pathname}
    />
  );
};

NavLink.displayName = displayName;
