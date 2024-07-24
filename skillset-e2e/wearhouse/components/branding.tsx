import { siteConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface BrandingProps {}

const displayName = 'Branding';

export const Branding = (props: BrandingProps) => {
  const {} = props;

  return (
    <Link href="/" className="flex items-center gap-2 text-black">
      <Image src="/favicon.svg" alt="logo" width={20} height={20} />

      <span className="-mt-1 font-integral text-lg font-medium leading-none">
        {siteConfig.name}
      </span>
    </Link>
  );
};

Branding.displayName = displayName;
