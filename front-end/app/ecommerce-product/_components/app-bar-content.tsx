import { AvatarImage, AvatarRoot } from '@typeweave/react/avatar';
import { ThemeSwitcher } from '@repo/ui/theme-switcher';
import { Branding } from '@repo/ui/branding';
import { siteConfig } from '../site.config';
import { CartDrawer } from './cart-drawer';
import React from 'react';

const displayName = 'AppBarContent';

export const AppBarContent = () => {
  return (
    <div className="flex min-h-16 flex-wrap items-center justify-center gap-3 px-5 py-2 md:px-8">
      <Branding href={siteConfig.pathname}>
        {siteConfig.name}
      </Branding>

      <div className="flex grow items-center justify-end gap-3">
        <CartDrawer />

        <ThemeSwitcher />

        <AvatarRoot>
          <AvatarImage src="https://avatar.iran.liara.run/public/48" />
        </AvatarRoot>
      </div>
    </div>
  );
};

AppBarContent.displayName = displayName;
