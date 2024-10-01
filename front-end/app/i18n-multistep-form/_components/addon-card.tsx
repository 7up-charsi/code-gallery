import { FormValues } from '../[locale]/skill-demo/page';
import { useDictionaryCtx } from './dictionary-provider';
import { useWatch } from 'react-hook-form';
import { CheckIcon } from 'lucide-react';
import React from 'react';

interface AddonCardProps {
  name: string;
  price: number;
  desc: string;
  descId: string;
  inputId: string;
  selected: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const displayName = 'AddonCard';

export const AddonCard = (props: AddonCardProps) => {
  const { desc, name, price, descId, inputId, onChange, selected } =
    props;

  const dictionary = useDictionaryCtx(displayName);
  const billing = useWatch<FormValues>({ name: 'plan.billing' });

  return (
    <div
      role="group"
      className="pointer-events-none relative isolate flex min-h-16 select-none items-center gap-3 px-3 py-3"
    >
      <div
        data-active={selected}
        className="border-muted-8 data-[active=true]:bg-primary-9 flex size-5 shrink-0 items-center justify-center rounded border text-white data-[active=true]:border-transparent"
      >
        {selected ? <CheckIcon size={15} /> : null}
      </div>

      <input
        type="checkbox"
        id={inputId}
        aria-describedby={descId}
        checked={selected}
        onChange={onChange}
        className="ring-focus hover:bg-muted-3 pointer-events-auto absolute inset-0 -z-50 cursor-pointer appearance-none rounded outline-none focus-visible:ring-2"
      />

      <div className="flex grow flex-col">
        <label htmlFor={inputId} className="font-semibold capitalize">
          {name}
        </label>
        <span id={descId} className="text-muted-11/80 text-sm">
          {desc}
        </span>
      </div>

      <div className="text-primary-11 text-balance text-center font-medium">
        $ {price} /{' '}
        {dictionary.step2.fields.billing[billing as string]}
      </div>
    </div>
  );
};

AddonCard.displayName = displayName;
