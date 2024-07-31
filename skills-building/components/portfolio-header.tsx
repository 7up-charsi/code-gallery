import { portfolio } from '@repo/meta';
import Link from 'next/link';
import React from 'react';

interface PortfolioHeaderProps {}

const displayName = 'PortfolioHeader';

export const PortfolioHeader = (props: PortfolioHeaderProps) => {
  const {} = props;

  return (
    <div className="flex h-10 select-none items-center justify-center gap-2 overflow-hidden border-b border-muted-6 bg-background">
      <Link
        href={portfolio.url}
        aria-label="go to protfolio"
        aria-describedby="portfolio-link-desc"
        className="text-lg font-normal uppercase text-black outline-none ring-focus focus-visible:ring-2"
      >
        {portfolio.name}
      </Link>

      <p id="portfolio-link-desc" className="text-sm text-black/70">
        {portfolio.tagline}
      </p>
    </div>
  );
};

PortfolioHeader.displayName = displayName;
