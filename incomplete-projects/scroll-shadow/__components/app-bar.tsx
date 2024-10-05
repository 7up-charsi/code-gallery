'use client';

import { Branding } from '@repo/ui/branding';
import { siteConfig } from '../site.config';
import React from 'react';

interface AppBarProps {}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const {} = props;

  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollBody =
        document.body.scrollTop || document.documentElement.scrollTop;

      if (scrollBody) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      data-scroll={isScrolled}
      className="bg-background sticky -top-10 data-[scroll=true]:shadow-md"
    >
      <PortfolioHeader />

      <div className="flex h-16 items-center px-5">
        <Branding href={siteConfig.name}>{siteConfig.name}</Branding>

        <div className="grow"></div>

        <div className="bg-muted-3 h-7 w-12 rounded"></div>
        <div className="bg-muted-3 ml-2 h-7 w-12 rounded"></div>
        <div className="bg-muted-3 ml-2 h-7 w-12 rounded"></div>
      </div>
    </header>
  );
};

AppBar.displayName = displayName;
