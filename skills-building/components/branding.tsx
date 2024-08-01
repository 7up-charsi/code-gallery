import Link, { LinkProps } from 'next/link';
import { twMerge } from 'tailwind-merge';
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
      className={twMerge(
        'whitespace-nowrap text-lg font-normal capitalize text-black outline-none ring-focus focus-visible:ring-2 dark:text-white',
        className,
      )}
    />
  );
};

Branding.displayName = displayName;
