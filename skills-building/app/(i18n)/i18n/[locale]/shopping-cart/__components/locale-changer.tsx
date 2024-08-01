'use client';

import { useIsMounted } from '@typeweave/react/use-is-mounted';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from '@typeweave/react/skeleton';
import { Combobox } from '@typeweave/react/combobox';
import { Input } from '@typeweave/react/input';
import { LanguagesIcon } from 'lucide-react';
import React from 'react';

interface LocaleChangerProps {
  className?: string;
}

const displayName = 'LocaleChanger';

const options = [
  { label: 'English', value: 'en-US' },
  { label: 'Portuguese', value: 'pt-PT' },
];

export const LocaleChanger = (props: LocaleChangerProps) => {
  const { className } = props;

  const router = useRouter();

  const { locale } = useParams<{ locale: string }>();

  const isMounted = useIsMounted();

  return (
    <>
      {isMounted ? null : (
        <Skeleton
          variant="rounded"
          className="h-9 w-40 max-lg:hidden"
        />
      )}

      {!isMounted ? null : (
        <Combobox
          value={options.find((opt) => opt.value === locale)}
          options={options}
          disableClearable
          onChange={(value, reason) => {
            if (reason === 'selectOption') {
              router.push(`/i18n/${value.value}/shopping-cart`);
            }
          }}
          renderInput={(props) => (
            <Input
              label="select locale"
              hideLabel
              {...props}
              classNames={{
                ...props.classNames,
                inputWrapper: 'h-9',
              }}
              startContent={<LanguagesIcon />}
              className={className}
            />
          )}
        />
      )}
    </>
  );
};

LocaleChanger.displayName = displayName;