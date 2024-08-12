import { PortfolioHeader } from '@/components/portfolio-header';
import { Branding } from '@/components/branding';
import { siteConfig } from '../site.config';
import Link from 'next/link';
import React from 'react';

interface AppBarContentProps {}

const displayName = 'AppBarContent';

export const AppBarContent = (props: AppBarContentProps) => {
  const {} = props;

  return (
    <>
      <PortfolioHeader />

      <div className="flex h-16 items-center bg-muted-2 px-5">
        <Branding href={siteConfig.pathname} className="font-logo">
          {siteConfig.name}
        </Branding>

        <div className="grow"></div>

        <div className="flex items-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Link
              key={i}
              href={`${siteConfig.pathname}/${i + 1}`}
              className="h-9 content-center rounded px-4 capitalize outline-none ring-focus hover:bg-muted-3 focus-visible:ring-2 active:bg-muted-4"
            >
              page {i + 1}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

AppBarContent.displayName = displayName;
