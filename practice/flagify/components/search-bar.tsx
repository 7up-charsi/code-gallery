'use client';

import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { Button, Combobox, Input } from '@typeweave/react';
import debounce from 'lodash.debounce';
import { XIcon } from 'lucide-react';
import React from 'react';

interface SearchBarProps {}

const displayName = 'SearchBar';

const regions = ['africa', 'america', 'asia', 'europe', 'oceania'];

export const SearchBar = (props: SearchBarProps) => {
  const {} = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const name = searchParams.get('name');
  const region = searchParams.get('region');

  const [nameValue, setNameValue] = React.useState(name ?? '');
  const [regionValue, setRegionValue] = React.useState<string | null>(
    region && name ? name : (region ?? null),
  );

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="grid grid-cols-1 gap-5 md:grid-cols-[2fr_1fr]"
    >
      <Input
        label="search countries"
        className="w-full"
        placeholder="Country Name..."
        value={nameValue}
        onChange={(e) => {
          setRegionValue(null);

          const value = e.target.value;
          setNameValue(value);
          debounced(value);
        }}
        endContent={
          name && (
            <Button
              isIconOnly
              aria-label="remove name filter"
              size="sm"
              onPress={() => {
                setNameValue('');
                const params = new URLSearchParams();
                params.delete('name');
                router.push(`/?` + params.toString());
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
            className="w-full"
            classNames={{ ...props.classNames, input: 'capitalize' }}
          />
        )}
      />
    </form>
  );
};

SearchBar.displayName = displayName;
