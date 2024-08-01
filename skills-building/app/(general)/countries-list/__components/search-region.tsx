'use client';

import { useSearchFieldsCtx } from './search-fields-provider';
import { usePathname, useRouter } from 'next/navigation';
import { Combobox } from '@typeweave/react/combobox';
import { Input } from '@typeweave/react/input';
import React from 'react';

interface SearchRegionProps {}

const displayName = 'SearchRegion';

const regions = ['africa', 'america', 'asia', 'europe', 'oceania'];

export const SearchRegion = (props: SearchRegionProps) => {
  const {} = props;

  const router = useRouter();
  const pathname = usePathname();

  const { regionValue, setNameValue, setRegionValue } =
    useSearchFieldsCtx(displayName);

  return (
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
          placeholder="Region"
          {...props}
          hideLabel
          className="w-full lg:h-9 lg:w-40"
          classNames={{
            ...props.classNames,
            input: 'capitalize',
            inputWrapper: 'bg-background',
          }}
        />
      )}
    />
  );
};

SearchRegion.displayName = displayName;
