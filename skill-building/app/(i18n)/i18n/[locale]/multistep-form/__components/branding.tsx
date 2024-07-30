import author from '@repo/meta/author.json';
import Link from 'next/link';
import React from 'react';

interface BrandingProps {}

const displayName = 'Branding';

export const Branding = (props: BrandingProps) => {
  const {} = props;

  return (
    <Link
      href={author.portfolio}
      aria-label="go to portfolio"
      className="text-xl uppercase"
    >
      {author.name}
    </Link>
  );
};

Branding.displayName = displayName;
