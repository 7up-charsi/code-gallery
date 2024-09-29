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
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useIsMounted } from '@typeweave/react/use-is-mounted';
import { ChevronDownIcon, LanguagesIcon } from 'lucide-react';
import { Skeleton } from '@typeweave/react/skeleton';
import { Button } from '@typeweave/react/button';
import React from 'react';

interface LocaleSwitcherProps {
  locales: { short: string; label: string; value: string }[];
}

const displayName = 'LocaleSwitcher';

export const LocaleSwitcher = (props: LocaleSwitcherProps) => {
  const { locales } = props;

  const isMounted = useIsMounted();
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams<{ locale: string }>();

  return (
    <>
      {!isMounted && (
        <Skeleton variant="rounded" className="h-9 w-14" />
      )}

      {isMounted && (
        <MenuRoot>
          <MenuTrigger>
            <Button
              variant="text"
              aria-label="theme switcher"
              startContent={<LanguagesIcon />}
              endContent={<ChevronDownIcon />}
              className="data-[open=true]:bg-muted-4 w-[83px] gap-1 p-0 px-2"
              classNames={{ content: 'grow', startContent: 'mr-1' }}
            >
              {locales.find((ele) => ele.value === locale)?.short}
            </Button>
          </MenuTrigger>

          <MenuPortal>
            <MenuContent className="z-50 min-w-[130px]">
              <MenuArrow />

              <MenuRadioGroup
                value={locale}
                label="themes"
                hideLabel
                onChange={(value) => {
                  const newPathname = pathname.replace(locale, value);

                  router.push(newPathname);
                }}
              >
                {locales.map((ele) => (
                  <MenuRadioItem
                    key={ele.label}
                    value={ele.value}
                    classNames={{
                      itemContent: ' capitalize',
                      itemIcon: 'hidden',
                    }}
                  >
                    {ele.label}
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

LocaleSwitcher.displayName = displayName;
