import Link, { LinkProps } from 'next/link';
import React from 'react';

interface BrandingProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const displayName = 'Branding';

export const Branding = (props: BrandingProps) => {
  const { className, ...restProps } = props;

  return (
    <Link
      {...restProps}
      className="text-muted-12 ring-focus whitespace-nowrap text-lg font-normal capitalize outline-none focus-visible:ring-2"
    />
  );
};

Branding.displayName = displayName;
