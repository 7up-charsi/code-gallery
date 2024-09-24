import {
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from '@typeweave/react/drawer';
import { SideBarContent } from './side-bar-content';
import { Branding, ThemeSwitcher } from '@repo/ui';
import { Button } from '@typeweave/react/button';
import { MenuIcon, XIcon } from 'lucide-react';
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

      <ThemeSwitcher />

      <DrawerRoot>
        <DrawerTrigger>
          <Button
            isIconOnly
            aria-label="menu"
            variant="text"
            className="text-2xl md:hidden"
          >
            <MenuIcon />
          </Button>
        </DrawerTrigger>

        <DrawerPortal>
          <DrawerOverlay className="md:hidden" />
          <DrawerContent className="md:hidden">
            <div className="flex h-16 items-center justify-between px-5">
              <Branding href={siteConfig.pathname}>
                {siteConfig.name}
              </Branding>

              <DrawerClose>
                <Button
                  isIconOnly
                  aria-label="menu"
                  variant="text"
                  color="danger"
                >
                  <XIcon />
                </Button>
              </DrawerClose>
            </div>

            <SideBarContent isExpanded />
          </DrawerContent>
        </DrawerPortal>
      </DrawerRoot>
    </div>
  );
};

AppBarContent.displayName = displayName;
