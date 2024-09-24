import { useFormContext, useWatch } from 'react-hook-form';
import { FormValues } from '../[locale]/skill-demo/page';
import { useDictionaryCtx } from './dictionary-provider';
import { AddonCard } from './addon-card';
import React from 'react';

interface OnlineServiceAddonProps {}

const displayName = 'OnlineServiceAddon';

const id = 'd290f1ee-6c54-4b01-90e6-d701748f0851';
const name = 'online service';
const price = 10;
const inputId = '2d3e6b5a-6d8a-4a1e-9f5b-8c5a7d3b1f6c';
const descId = '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d';

export const OnlineServiceAddon = (
  props: OnlineServiceAddonProps,
) => {
  const {} = props;

  const dictionary = useDictionaryCtx(displayName);

  const { setValue } = useFormContext<FormValues>();

  const selectedId = useWatch<FormValues>({
    name: 'onlineServiceAddon.id',
  });

  return (
    <AddonCard
      name={dictionary.step3.fields.onlineService.label}
      desc={dictionary.step3.fields.onlineService.description}
      price={price}
      inputId={inputId}
      descId={descId}
      selected={id === selectedId}
      onChange={(e) => {
        if (e.target.checked) {
          setValue('onlineServiceAddon.id', id);
          setValue('onlineServiceAddon.name', name);
          setValue('onlineServiceAddon.price', price);
        } else {
          setValue('onlineServiceAddon', null);
        }
      }}
    />
  );
};

OnlineServiceAddon.displayName = displayName;
