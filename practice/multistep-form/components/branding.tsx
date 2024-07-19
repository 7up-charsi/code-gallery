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
      className="text-xl uppercase"
    >
      uxweaver
    </Link>
  );
};

Branding.displayName = displayName;
