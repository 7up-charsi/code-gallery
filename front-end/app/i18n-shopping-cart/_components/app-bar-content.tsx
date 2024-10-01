import { Branding, LocaleSwitcher, ThemeSwitcher } from '@repo/ui';
import { siteConfig } from '../site.config';
import { CartDrawer } from './cart-drawer';
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
        <CartDrawer />

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
