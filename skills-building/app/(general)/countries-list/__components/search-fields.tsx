'use client';

import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useSearchFieldsCtx } from './search-fields-provider';
import { Combobox } from '@typeweave/react/combobox';
import { Button } from '@typeweave/react/button';
import { Input } from '@typeweave/react/input';
import { siteConfig } from '../site.config';
import debounce from 'lodash.debounce';
import { XIcon } from 'lucide-react';
import React from 'react';

interface SearchFieldsProps {
  hideLabel?: boolean;
}

const displayName = 'SearchFields';

const regions = ['africa', 'america', 'asia', 'europe', 'oceania'];

export const SearchFields = (props: SearchFieldsProps) => {
  const { hideLabel } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { nameValue, regionValue, setNameValue, setRegionValue } =
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
    <>
      <Input
        label="search countries"
        className="w-full"
        classNames={{ inputWrapper: 'bg-white' }}
        placeholder="Country Name..."
        value={nameValue}
        hideLabel={hideLabel}
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

      <Combobox
        options={regions}
        classNames={{ option: 'capitalize' }}
        value={regionValue}
        onChange={(value) => {
          setRegionValue(value);
          setNameValue('');

          const params = new URLSearchParams();

          if (!value) {
            params.delete('region');
            router.push(pathname + '?' + params.toString());
            return;
          }

          params.delete('name');
          params.set('region', value);
          router.push(pathname + '?' + params.toString());
        }}
        renderInput={(props) => (
          <Input
            label="filter by region"
            placeholder="select Any Region"
            {...props}
            hideLabel={hideLabel}
            className="w-full"
            classNames={{
              ...props.classNames,
              input: 'capitalize',
              inputWrapper: 'bg-white',
            }}
          />
        )}
      />
    </>
  );
};

SearchFields.displayName = displayName;
