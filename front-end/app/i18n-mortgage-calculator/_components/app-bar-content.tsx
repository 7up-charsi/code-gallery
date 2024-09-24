import { Branding, LocaleSwitcher, ThemeSwitcher } from '@repo/ui';
import { siteConfig } from '../site.config';
import React from 'react';

interface AppBarContentProps {}

const displayName = 'AppBarContent';

export const AppBarContent = (props: AppBarContentProps) => {
  const {} = props;

  return (
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
  );
};

AppBarContent.displayName = displayName;
