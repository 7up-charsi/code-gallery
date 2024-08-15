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
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useIsMounted } from '@typeweave/react/use-is-mounted';
import { ChevronDownIcon, LanguagesIcon } from 'lucide-react';
import { Skeleton } from '@typeweave/react/skeleton';
import { Button } from '@typeweave/react/button';
import React from 'react';

interface LocaleSwitcherProps {
  locales: { label: string; value: string }[];
}

const displayName = 'LocaleSwitcher';

export const LocaleSwitcher = (props: LocaleSwitcherProps) => {
  const { locales } = props;

  const isMounted = useIsMounted();
  const router = useRouter();
  const searchParams = useSearchParams();
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
              aria-label="theme switcher"
              endContent={<ChevronDownIcon />}
              className="w-14 gap-1"
            >
              <LanguagesIcon size={20} />
            </Button>
          </MenuTrigger>

          <MenuPortal>
            <MenuContent className="z-50">
              <MenuArrow />

              <MenuRadioGroup
                value={locale}
                label="themes"
                hideLabel
                onChange={(value) => {
                  const newPathname = pathname.replace(locale, value);

                  router.push(
                    `${newPathname}?${searchParams.toString()}`,
                  );
                }}
              >
                {locales.map((ele) => (
                  <MenuRadioItem
                    key={ele.label}
                    value={ele.value}
                    classNames={{
                      itemContent: ' capitalize',
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
