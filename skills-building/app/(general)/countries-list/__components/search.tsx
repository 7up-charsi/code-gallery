'use client';

import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { Combobox } from '@typeweave/react/combobox';
import { Button } from '@typeweave/react/button';
import { Input } from '@typeweave/react/input';
import { siteConfig } from '../site.config';
import debounce from 'lodash.debounce';
import { XIcon } from 'lucide-react';
import React from 'react';

interface SearchProps {}

const displayName = 'Search';

const regions = ['africa', 'america', 'asia', 'europe', 'oceania'];

export const Search = (props: SearchProps) => {
  const {} = props;

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const name = searchParams.get('name');
  const region = searchParams.get('region');

  const [regionValue, setRegionValue] = React.useState<string | null>(
    region ?? null,
  );

  const [nameValue, setNameValue] = React.useState(name ?? '');

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
    <search className="col-span-2 lg:col-span-1 lg:col-start-2 lg:col-end-3">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid w-full grid-cols-2 items-center justify-center gap-3 md:grid-cols-[2fr_1fr] lg:row-start-1 lg:row-end-2 lg:grid-cols-[auto_auto] lg:justify-end"
      >
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
      </form>
    </search>
  );
};

Search.displayName = displayName;
