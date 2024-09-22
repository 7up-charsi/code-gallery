'use client';

import {
  MenuArrow,
  MenuContent,
  MenuPortal,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRoot,
  MenuTrigger,
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

  const { theme, setTheme } = useTheme();

  const isMounted = useIsMounted();

  return (
    <>
      {!isMounted && (
        <Skeleton variant="rounded" className="h-9 w-14 rounded" />
      )}

      {isMounted && (
        <MenuRoot>
          <MenuTrigger>
            <Button
              isIconOnly
              aria-label="locale switcher"
              variant="text"
              className="data-[open=true]:bg-muted-4 w-14 justify-between p-2"
            >
              {theme === 'light' && <SunIcon />}
              {theme === 'dark' && <MoonStarIcon />}
              {theme === 'system' && <MonitorIcon />}

              <ChevronDownIcon size={20} />
            </Button>
          </MenuTrigger>

          <MenuPortal>
            <MenuContent className="z-[999]">
              <MenuArrow />

              <MenuRadioGroup
                onChange={setTheme}
                value={theme}
                label="locale"
                hideLabel
              >
                {[
                  {
                    label: 'light',
                    value: 'light',
                    icon: <SunIcon size={18} />,
                  },
                  {
                    label: 'dark',
                    value: 'dark',
                    icon: <MoonStarIcon size={18} />,
                  },
                  {
                    label: 'system',
                    value: 'system',
                    icon: <MonitorIcon size={18} />,
                  },
                ].map((ele, i) => (
                  <MenuRadioItem
                    value={ele.value}
                    key={i}
                    className="data-[checked=true]:bg-muted-3 max-md:h-10"
                    classNames={{
                      itemIcon: 'hidden',
                      itemContent:
                        'flex justify-between items-center',
                    }}
                  >
                    <span className="capitalize">{ele.label}</span>
                    {ele.icon}
                  </MenuRadioItem>
                ))}
              </MenuRadioGroup>
            </MenuContent>
          </MenuPortal>
        </MenuRoot>
      )}
    </>
  );
};

ThemeSwitcher.displayName = displayName;
