'use client';

import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useSearchFieldsCtx } from './search-fields-provider';
import { Button } from '@typeweave/react/button';
import { Input } from '@typeweave/react/input';
import { siteConfig } from '../site.config';
import debounce from 'lodash.debounce';
import { XIcon } from 'lucide-react';
import React from 'react';

interface SearchNameProps {}

const displayName = 'SearchName';

export const SearchName = (props: SearchNameProps) => {
  const {} = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { nameValue, setNameValue, setRegionValue } =
    useSearchFieldsCtx(displayName);

  const debounced = React.useMemo(
    () =>
      debounce((value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (!value) {
          params.delete('name');
          router.push(pathname + '?' + params.toString());
          return;
        }

        params.delete('region');
        params.set('name', value);
        router.push(pathname + '?' + params.toString());
      }, 500),
    [pathname, router, searchParams],
  );

  return (
    <Input
      label="search countries"
      className="w-full lg:h-9 lg:w-60"
      classNames={{ inputWrapper: 'bg-background' }}
      placeholder="Country Name..."
      value={nameValue}
      hideLabel
      onChange={(e) => {
        setRegionValue(null);

        const value = e.target.value;
        setNameValue(value);
        debounced(value);
      }}
      endContent={
        nameValue && (
          <Button
            isIconOnly
            aria-label="remove name filter"
            size="sm"
            type="button"
            onPress={() => {
              setNameValue('');
              const params = new URLSearchParams();
              params.delete('name');
              router.push(
                siteConfig.pathname + '/?' + params.toString(),
              );
            }}
          >
            <XIcon />
          </Button>
        )
      }
    />
  );
};

SearchName.displayName = displayName;
