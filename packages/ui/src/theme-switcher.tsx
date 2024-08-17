'use client';

import {
  MenuRoot,
  MenuArrow,
  MenuTrigger,
  MenuPortal,
  MenuContent,
  MenuRadioGroup,
  MenuRadioItem,
} from '@typeweave/react/menu';
import {
  ChevronDownIcon,
  MonitorIcon,
  MoonStarIcon,
  SunIcon,
} from 'lucide-react';
import { useIsMounted } from '@typeweave/react/use-is-mounted';
import { Skeleton } from '@typeweave/react/skeleton';
import { Button } from '@typeweave/react/button';
import { useTheme } from 'next-themes';
import React from 'react';

interface ThemeSwitcherProps {}

const displayName = 'ThemeSwitcher';

export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  const {} = props;

  const { setTheme, theme } = useTheme();

  const isMounted = useIsMounted();

  return (
    <>
      {!isMounted && (
        <Skeleton variant="rounded" className="h-9 w-14" />
      )}

      {isMounted && (
        <MenuRoot>
          <MenuTrigger>
            <Button
              aria-label="theme switcher"
              endContent={<ChevronDownIcon />}
              className="w-14 gap-1"
            >
              {theme === 'light' && <SunIcon size={20} />}
              {theme === 'dark' && <MoonStarIcon size={20} />}
              {theme === 'system' && <MonitorIcon size={20} />}
            </Button>
          </MenuTrigger>

          <MenuPortal>
            <MenuContent className="z-50">
              <MenuArrow />

              <MenuRadioGroup
                value={theme}
                label="themes"
                hideLabel
                onChange={setTheme}
              >
                <MenuRadioItem
                  value="light"
                  classNames={{
                    itemContent: 'flex gap-3 capitalize items-center',
                  }}
                >
                  <SunIcon size={18} />
                  <span>light</span>
                </MenuRadioItem>

                <MenuRadioItem
                  value="dark"
                  classNames={{
                    itemContent: 'flex gap-3 capitalize items-center',
                  }}
                >
                  <MoonStarIcon size={18} />
                  <span>dark</span>
                </MenuRadioItem>

                <MenuRadioItem
                  value="system"
                  classNames={{
                    itemContent: 'flex gap-3 capitalize items-center',
                  }}
                >
                  <MonitorIcon size={18} />
                  <span>system</span>
                </MenuRadioItem>
              </MenuRadioGroup>
            </MenuContent>
          </MenuPortal>
        </MenuRoot>
      )}
    </>
  );
};

ThemeSwitcher.displayName = displayName;
