import { siteConfig } from '@/config/site';
import Link from 'next/link';
import React from 'react';

interface BrandingProps {}

const displayName = 'Branding';

export const Branding = (props: BrandingProps) => {
  const {} = props;

  return (
    <Link
      href={siteConfig.portfolio}
      aria-label="go to portfolio"
      className="select-none text-xl uppercase outline-none ring-focus focus-visible:ring-2"
    >
      uxweaver
    </Link>
  );
};

Branding.displayName = displayName;
