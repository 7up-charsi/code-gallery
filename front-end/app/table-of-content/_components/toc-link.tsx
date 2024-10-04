'use client';

import { DrawerLink, DrawerLinkProps } from '@repo/ui/drawer-link';
import React from 'react';

interface TocLinkProps extends DrawerLinkProps {
  isActive: boolean;
}

const displayName = 'TocLink';

export const TocLink = (props: TocLinkProps) => {
  const { isActive, ...restProps } = props;

  const linkRef = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    if (isActive && linkRef.current) {
      linkRef.current.scrollIntoView({
        // behavior: 'smooth', // smooth does not work
        block: 'nearest',
      });
    }
  }, [isActive]);

  return <DrawerLink ref={linkRef} {...restProps} />;
};

TocLink.displayName = displayName;
