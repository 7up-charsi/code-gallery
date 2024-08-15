import { PortfolioHeader } from '@/components/portfolio-header';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Branding } from '@/components/branding';
import { siteConfig } from '../site.config';
import React from 'react';

interface AppBarContentProps {}

const displayName = 'AppBarContent';

export const AppBarContent = (props: AppBarContentProps) => {
  const {} = props;

  return (
    <>
      <PortfolioHeader />

      <div className="flex h-16 items-center gap-3 px-5 md:px-8">
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
    </>
  );
};

AppBarContent.displayName = displayName;
