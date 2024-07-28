'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@typeweave/react/input';
import debounce from 'lodash.debounce';
import React from 'react';

interface SearchProps {}

const displayName = 'Search';

export const Search = (props: SearchProps) => {
  const {} = props;

  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setvalue] = React.useState(
    searchParams.get('query') ?? '',
  );

  const debounced = React.useMemo(
    () =>
      debounce((value: string) => {
        const searchParams = new URLSearchParams();

        searchParams.set('query', value);

        router.push(`/?${searchParams.toString()}`);
      }, 500),
    [router],
  );

  return (
    <search className="grow">
      <Input
        label="search tasks"
        hideLabel
        value={value}
        onChange={(e) => {
          setvalue(e.target.value);
          debounced(e.target.value);
        }}
        placeholder="Search Tasks..."
        className="w-full"
        classNames={{ inputWrapper: 'h-9' }}
      />
    </search>
  );
};

Search.displayName = displayName;
