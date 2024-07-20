import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface BrandingProps {}

const displayName = 'Branding';

export const Branding = (props: BrandingProps) => {
  const {} = props;

  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src="/logo-icon.svg" alt="logo" width={25} height={25} />

      <span className="capitalize text-primary-11 font-medium text-lg">
        ecobazar
      </span>
    </Link>
  );
};

Branding.displayName = displayName;
