import { portfolio } from '@repo/meta';
import React from 'react';

interface PortfolioHeaderProps {
  linkComp: React.FunctionComponent<any>;
}

const displayName = 'PortfolioHeader';

export const PortfolioHeader = (props: PortfolioHeaderProps) => {
  const { linkComp: LinkComp } = props;

  return (
    <div className="border-test h-7">
      <LinkComp
        href={portfolio.url}
        aria-label="go to protfolio"
        aria-descripbedby="portfolio-link-desc"
      >
        {portfolio.name}
      </LinkComp>

      <p id="portfolio-link-desc">{portfolio.tagline}</p>
    </div>
  );
};

PortfolioHeader.displayName = displayName;
