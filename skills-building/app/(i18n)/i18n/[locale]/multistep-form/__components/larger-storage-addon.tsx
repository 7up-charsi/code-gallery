import { useFormContext, useWatch } from 'react-hook-form';
import { useDictionaryCtx } from './dictionary-provider';
import { AddonCard } from './addon-card';
import { FormValues } from '../page';
import React from 'react';

interface LargerStorageAddonProps {}

const displayName = 'LargerStorageAddon';

const id = '5d2d9e8b-8d0b-4c5a-8416-dcbfbe0a18a1';
const name = 'larger storage';
const price = 20;
const inputId = '3f4a5b6c-7d8e-9f0a-1b2c-3d4e5f6a7b8c';
const descId = '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e';

export const LargerStorageAddon = (
  props: LargerStorageAddonProps,
) => {
  const {} = props;

  const dictionary = useDictionaryCtx(displayName);

  const { setValue } = useFormContext<FormValues>();

  const selectedId = useWatch<FormValues>({
    name: 'largerStorageAddon.id',
  });

  return (
    <AddonCard
      name={dictionary.step3.fields.largerStorage.label}
      desc={dictionary.step3.fields.largerStorage.description}
      price={price}
      inputId={inputId}
      descId={descId}
      selected={id === selectedId}
      onChange={(e) => {
        if (e.target.checked) {
          setValue('largerStorageAddon.id', id);
          setValue('largerStorageAddon.name', name);
          setValue('largerStorageAddon.price', price);
        } else {
          setValue('largerStorageAddon', null);
        }
      }}
    />
  );
};

LargerStorageAddon.displayName = displayName;
