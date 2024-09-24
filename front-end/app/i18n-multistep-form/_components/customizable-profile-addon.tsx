import { useFormContext, useWatch } from 'react-hook-form';
import { useDictionaryCtx } from './dictionary-provider';
import { FormValues } from '../[locale]/page';
import { AddonCard } from './addon-card';
import React from 'react';

interface CustomizableProfileAddonProps {}

const displayName = 'CustomizableProfileAddon';

const id = '2d5c2e44-4f4a-4427-8e9b-d842fea77c6f';
const name = 'customizable profile';
const price = 30;
const inputId = '4e5f6a7b-8c9d-0a1b-2c3d-4e5f6a7b8c9d';
const descId = '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f';

export const CustomizableProfileAddon = (
  props: CustomizableProfileAddonProps,
) => {
  const {} = props;

  const dictionary = useDictionaryCtx(displayName);

  const { setValue } = useFormContext<FormValues>();

  const selectedId = useWatch<FormValues>({
    name: 'customizableProfileAddon.id',
  });

  return (
    <AddonCard
      name={dictionary.step3.fields.customizableProfile.label}
      desc={dictionary.step3.fields.customizableProfile.description}
      price={price}
      inputId={inputId}
      descId={descId}
      selected={id === selectedId}
      onChange={(e) => {
        if (e.target.checked) {
          setValue('customizableProfileAddon.id', id);
          setValue('customizableProfileAddon.name', name);
          setValue('customizableProfileAddon.price', price);
        } else {
          setValue('customizableProfileAddon', null);
        }
      }}
    />
  );
};

CustomizableProfileAddon.displayName = displayName;
