import Link from 'next/link';
import { Salsa } from 'next/font/google';
import React from 'react';

interface BrandingProps {}

const displayName = 'Branding';

const font = Salsa({
  display: 'swap',
  subsets: ['latin'],
  weight: '400',
});

export const Branding = (props: BrandingProps) => {
  const {} = props;

  return (
    <Link
      href="/"
      style={font.style}
      className="text-primary-11 text-2xl capitalize"
    >
      weather
    </Link>
  );
};

Branding.displayName = displayName;
