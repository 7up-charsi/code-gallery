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
      className="pointer-events-none relative isolate flex min-h-16 select-none items-center gap-3 px-3 py-2 pl-16"
    >
      <div className="absolute left-8 -translate-x-1/2">
        <div
          data-active={selected}
          className="border-muted-8 data-[active=true]:bg-primary-9 flex size-5 items-center justify-center rounded border text-white data-[active=true]:border-transparent"
        >
          {selected ? <CheckIcon size={15} /> : null}
        </div>
      </div>

      <div className="flex grow flex-col">
        <input
          type="checkbox"
          id={inputId}
          aria-describedby={descId}
          checked={selected}
          onChange={onChange}
          className="border-muted-6 ring-focus checked:border-primary-8 checked:bg-primary-3 hover:bg-muted-3 checked:hover:bg-primary-4 pointer-events-auto absolute inset-0 -z-50 cursor-pointer appearance-none rounded border outline-none focus-visible:ring-2"
        />
        <label htmlFor={inputId} className="font-semibold capitalize">
          {name}
        </label>
        <span id={descId} className="text-muted-11/80 text-sm">
          {desc}
        </span>
      </div>

      <div className="text-primary-11 font-medium">
        {/* @ts-ignore */}${price}/
        {dictionary.step2.fields.billing[billing as string]}
      </div>
    </div>
  );
};

AddonCard.displayName = displayName;
