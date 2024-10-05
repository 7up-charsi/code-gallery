import { LocaleSwitcher } from '@repo/ui/locale-switcher';
import { ThemeSwitcher } from '@repo/ui/theme-switcher';
import { Branding } from '@repo/ui/branding';
import { siteConfig } from '../site.config';
import React from 'react';

interface AppBarContentProps {}

const displayName = 'AppBarContent';

export const AppBarContent = (props: AppBarContentProps) => {
  const {} = props;

  return (
    <div className="flex min-h-16 flex-wrap items-center justify-center gap-3 px-5 py-2 md:px-8">
      <Branding href={siteConfig.pathname}>
        {siteConfig.name}
      </Branding>

      <div className="flex grow items-center justify-end gap-3">
        <LocaleSwitcher
          locales={[
            { short: 'en', label: 'English', value: 'en-US' },
            { short: 'pt', label: 'Portuguese', value: 'pt-PT' },
          ]}
        />
        <ThemeSwitcher />
      </div>
    </div>
  );
};

AppBarContent.displayName = displayName;
