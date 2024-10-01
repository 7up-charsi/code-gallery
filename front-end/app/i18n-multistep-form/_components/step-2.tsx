'use client';

import { PointerEvents } from '@typeweave/react/pointer-events';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormValues } from '../[locale]/skill-demo/page';
import { useDictionaryCtx } from './dictionary-provider';
import { useFormSteps } from '../_hooks/form-steps';
import { Switch } from '@typeweave/react/switch';
import { CircleIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface Step2Props {}

const displayName = 'Step2';

export const Step2 = (props: Step2Props) => {
  const {} = props;

  const switchId = React.useId();

  const dictionary = useDictionaryCtx(displayName);

  const {
    setValue,
    formState: { errors },
  } = useFormContext<FormValues>();
  const __plan = useWatch<FormValues>({ name: 'plan' });
  const plan = __plan as FormValues['plan'];

  const { currentStep } = useFormSteps();

  if (currentStep !== 2) return null;

  return (
    <div className="bg-background rounded p-5">
      {errors.plan ? (
        <div
          id="plan-error"
          className="text-danger-11 mb-1 text-sm first-letter:uppercase"
        >
          {dictionary.errors.selectOne}
        </div>
      ) : null}

      <fieldset
        aria-required={!!errors.plan}
        aria-describedby={errors.plan ? 'plan-error' : undefined}
        className=""
      >
        <legend className="sr-only">
          {dictionary.step2.description}
        </legend>

        {[
          {
            id: '4f8f1e1b-5d48-4e1b-9a9f-2e5d2b6c8b3a',
            label: 'arcade',
            price: 9,
            icon: '/assets/multistep-form/icon-arcade.svg',
            inputId: '9f1e7e3a-1234-4b5f-91d6-f849d05797a4',
            descId: 'ea38e3b6-15b2-4d1f-95df-74a2fa93c8ad',
          },
          {
            id: 'e2f1d4a7-12c8-4b49-b2f3-1c9e6a6f5a1b',
            label: 'advanced',
            price: 12,
            icon: '/assets/multistep-form/icon-advanced.svg',
            inputId: 'b8123db3-6d8a-44e1-8427-5a4a6b5d8bfb',
            descId: '57f7c2d8-8d9a-4a8f-9b9c-783e6b3c892b',
          },
          {
            id: '9b4a6d2e-7e48-4e3b-8b5d-6a9f3c2e1b4a',
            label: 'pro',
            price: 15,
            icon: '/assets/multistep-form/icon-pro.svg',
            inputId: 'c7b7e5f8-61d3-4c5f-835d-b7e23c5d98f6',
            descId: '85b3e2f6-a1c7-4a9e-9271-6a5e7b4f3e4c',
          },
        ].map(({ price, icon, label, descId, inputId, id }) => (
          <div
            key={id}
            role="group"
            className="pointer-events-none relative isolate flex select-none items-center gap-3 px-3 py-3"
          >
            <Image src={icon} alt="icon" width={35} height={35} />

            <input
              type="radio"
              id={inputId}
              aria-describedby={descId}
              className="ring-focus hover:bg-muted-3 peer pointer-events-auto absolute inset-0 -z-50 cursor-pointer appearance-none rounded outline-none focus-visible:ring-2"
              name="plan.billing"
              checked={plan.id === id}
              onChange={() => {
                setValue('plan.name', label);
                setValue('plan.price', price);
                setValue('plan.id', id);
              }}
            />

            <div className="flex grow flex-col">
              <label
                htmlFor={inputId}
                className="font-semibold capitalize"
              >
                {/* @ts-ignore */}
                {dictionary.step2.fields[label].label}
              </label>
              <span id={descId} className="text-muted-11/80 text-sm">
                ${price}/{/* @ts-ignore */}
                {dictionary.step2.fields.billing[plan.billing]}
              </span>
            </div>

            <CircleIcon
              size={18}
              className="peer-checked:fill-muted-9 peer-checked:stroke-muted-9"
            />
          </div>
        ))}

        <div
          role="group"
          className="mt-5 flex items-center justify-center gap-3 py-2"
        >
          <PointerEvents
            onPress={() => {
              setValue('plan.billing', 'monthly');
            }}
          >
            <button
              type="button"
              tabIndex={-1}
              aria-controls={switchId}
              aria-label="select monthly payment"
              data-active={plan.billing === 'monthly'}
              className="text-muted-11/60 data-[active=true]:text-primary-11 text-sm font-medium capitalize outline-none"
            >
              {dictionary.step2.fields.billing.monthly}
            </button>
          </PointerEvents>

          <Switch
            color="primary"
            id={switchId}
            checked={plan.billing === 'yearly'}
            onChange={(e) => {
              if (e.target.checked) {
                setValue('plan.billing', 'yearly');
              } else {
                setValue('plan.billing', 'monthly');
              }
            }}
            classNames={{
              input: 'border-transparent bg-primary-9',
              indicator: 'text-white',
            }}
          />

          <PointerEvents
            onPress={() => {
              setValue('plan.billing', 'yearly');
            }}
          >
            <button
              type="button"
              tabIndex={-1}
              aria-controls={switchId}
              aria-label="select yearly payment"
              data-active={plan.billing === 'yearly'}
              className="text-muted-11/60 data-[active=true]:text-primary-11 text-sm font-medium capitalize outline-none"
            >
              {dictionary.step2.fields.billing.yearly}
            </button>
          </PointerEvents>
        </div>
      </fieldset>
    </div>
  );
};

Step2.displayName = displayName;
