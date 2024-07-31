'use client';

import { createContextScope } from '@typeweave/react/context';
import { useSearchParams } from 'next/navigation';
import React from 'react';

interface SearchFieldsProviderProps {
  children?: React.ReactNode;
}

interface SearchFieldsCtxProps {
  regionValue: string | null;
  setRegionValue: React.Dispatch<React.SetStateAction<string | null>>;
  nameValue: string;
  setNameValue: React.Dispatch<React.SetStateAction<string>>;
}

const displayName = 'SearchFieldsProvider';

const [SearchFieldsCtx, useSearchFieldsCtx] =
  createContextScope<SearchFieldsCtxProps>(displayName);

export { useSearchFieldsCtx };

export const SearchFieldsProvider = (
  props: SearchFieldsProviderProps,
) => {
  const { children } = props;

  const searchParams = useSearchParams();

  const name = searchParams.get('name');
  const region = searchParams.get('region');

  const [regionValue, setRegionValue] = React.useState<string | null>(
    region ?? null,
  );

  const [nameValue, setNameValue] = React.useState(name ?? '');

  return (
    <SearchFieldsCtx
      regionValue={regionValue}
      setRegionValue={setRegionValue}
      nameValue={nameValue}
      setNameValue={setNameValue}
    >
      {children}
    </SearchFieldsCtx>
  );
};

SearchFieldsProvider.displayName = displayName;
