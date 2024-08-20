'use client';

import { PointerEvents } from '@typeweave/react/pointer-events';
import { useDictionaryCtx } from './dictionary-provider';
import { useFormSteps } from '../__zustand/form-steps';
import { useWatch } from 'react-hook-form';
import { StepHeader } from './step-header';
import { FormValues } from '../page';
import React from 'react';

interface Step4Props {}

const displayName = 'Step4';

export const Step4 = (props: Step4Props) => {
  const {} = props;

  const dictionary = useDictionaryCtx(displayName);

  const { currentStep, isThankYouStep, updateStep } = useFormSteps();
  const [
    __plan,
    __onlineServiceAddon,
    __largerStorageAddon,
    __customizableProfileAddon,
  ] = useWatch<FormValues>({
    name: [
      'plan',
      'onlineServiceAddon',
      'largerStorageAddon',
      'customizableProfileAddon',
    ],
  });

  const plan = __plan as FormValues['plan'];

  const onlineServiceAddon =
    __onlineServiceAddon as FormValues['onlineServiceAddon'];

  const largerStorageAddon =
    __largerStorageAddon as FormValues['largerStorageAddon'];

  const customizableProfileAddon =
    __customizableProfileAddon as FormValues['customizableProfileAddon'];

  const total =
    (plan.price || 0) +
    ((onlineServiceAddon?.price || 0) +
      (largerStorageAddon?.price || 0) +
      (customizableProfileAddon?.price || 0));

  if (currentStep !== 4 || isThankYouStep) return null;

  return (
    <>
      <StepHeader
        heading={dictionary.step4.heading}
        desc={dictionary.step4.description}
      />

      <table className="bg-primary-3 w-full border-collapse rounded">
        <thead className="text-primary-11 font-semibold">
          <tr
            data-has-addons={
              !!onlineServiceAddon ||
              !!largerStorageAddon ||
              !!customizableProfileAddon
            }
            className="border-muted-6 data-[has-addons=true]:border-b"
          >
            <th className="py-3 pl-10 pr-3 text-left">
              <div className="flex flex-col items-start">
                <span className="capitalize">
                  {/* @ts-ignore */}
                  {dictionary.step2.fields[plan.name].label} ({' '}
                  {/* @ts-ignore */}
                  {dictionary.step2.fields.billing[plan.billing]} )
                </span>

                <PointerEvents onPress={() => updateStep(2)}>
                  <button className="text-muted-11/80 font-normal underline">
                    {dictionary.buttons.change}
                  </button>
                </PointerEvents>
              </div>
            </th>
            <th className="pl-3 pr-10 text-right">${plan.price}</th>
          </tr>
        </thead>
        <tbody>
          {onlineServiceAddon && (
            <tr className="*:py-1 [&:first-child>td]:pt-7 [&:last-child>td]:pb-7">
              <td className="text-muted-11/85 pl-10 pr-3 capitalize">
                {dictionary.step3.fields.onlineService.label}
              </td>
              <td className="text-primary-11 pl-3 pr-10 text-right capitalize">
                +${onlineServiceAddon.price}
              </td>
            </tr>
          )}
          {largerStorageAddon && (
            <tr className="*:py-1 [&:first-child>td]:pt-7 [&:last-child>td]:pb-7">
              <td className="text-muted-11/85 pl-10 pr-3 capitalize">
                {
                  // @ts-ignore
                  dictionary.step3.fields.largerStorage.label
                }
              </td>
              <td className="text-primary-11 pl-3 pr-10 text-right capitalize">
                +${largerStorageAddon.price}
              </td>
            </tr>
          )}
          {customizableProfileAddon && (
            <tr className="*:py-1 [&:first-child>td]:pt-7 [&:last-child>td]:pb-7">
              <td className="text-muted-11/85 pl-10 pr-3 capitalize">
                {dictionary.step3.fields.customizableProfile.label}
              </td>
              <td className="text-primary-11 pl-3 pr-10 text-right capitalize">
                +${customizableProfileAddon.price}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="my-5 flex items-center justify-between px-10 capitalize">
        <span className="text-muted-11/85 font-medium">
          {dictionary.step4.total} ({' '}
          <span className="text-primary-11">
            {/* @ts-ignore */}
            {dictionary.step2.fields.billing[plan.billing]}
          </span>{' '}
          )
        </span>
        <span className="text-primary-11 font-semibold">
          ${total}
        </span>
      </div>
    </>
  );
};

Step4.displayName = displayName;
