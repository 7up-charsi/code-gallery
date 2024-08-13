'use client';

import Link, { LinkProps } from 'next/link';
import React from 'react';

interface TocLinkProps extends LinkProps {
  isActive: boolean;
  children?: React.ReactNode;
  className?: string;
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

  return <Link ref={linkRef} {...restProps} />;
};

TocLink.displayName = displayName;
