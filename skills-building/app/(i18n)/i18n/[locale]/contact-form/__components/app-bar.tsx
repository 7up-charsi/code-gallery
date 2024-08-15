'use client';

import { PortfolioHeader } from '@/components/portfolio-header';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Branding } from '@/components/branding';
import { siteConfig } from '../site.config';
import React from 'react';

interface AppBarProps {}

const displayName = 'AppBar';

export const AppBar = (props: AppBarProps) => {
  const {} = props;

  return (
    <header className="">
      <PortfolioHeader />

      <div className="flex h-16 items-center gap-3 border-b border-muted-6 bg-background px-5 md:px-10">
        <Branding href={siteConfig.pathname}>
          {siteConfig.name}
        </Branding>

        <div className="grow"></div>

        <LocaleSwitcher
          locales={[
            { label: 'English', value: 'en-US' },
            { label: 'Portuguese', value: 'pt-PT' },
          ]}
        />
        <ThemeSwitcher />
      </div>
    </header>
  );
};

AppBar.displayName = displayName;
