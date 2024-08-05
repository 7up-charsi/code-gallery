import { useParams, useRouter } from 'next/navigation';
import { Combobox } from '@typeweave/react/combobox';
import { Input } from '@typeweave/react/input';
import { LanguagesIcon } from 'lucide-react';
import React from 'react';

interface LangSwitcherProps {
  className?: string;
}

const displayName = 'LangSwitcher';

const options = [
  { label: 'English', value: 'en-US' },
  { label: 'Portuguese', value: 'pt-PT' },
];

export const LangSwitcher = (props: LangSwitcherProps) => {
  const { className } = props;

  const router = useRouter();

  const { locale } = useParams<{ locale: string }>();

  return (
    <Combobox
      value={options.find((opt) => opt.value === locale)}
      options={options}
      disableClearable
      onChange={(value, reason) => {
        if (reason === 'selectOption') {
          router.push(`/i18n/${value.value}/mortgage-calculator`);
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
  );
};

LangSwitcher.displayName = displayName;
