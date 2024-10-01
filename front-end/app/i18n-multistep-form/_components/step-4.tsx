'use client';

import { PointerEvents } from '@typeweave/react/pointer-events';
import { FormValues } from '../[locale]/skill-demo/page';
import { useDictionaryCtx } from './dictionary-provider';
import { useFormSteps } from '../_hooks/form-steps';
import { Control, useWatch } from 'react-hook-form';
import React from 'react';

interface Step4Props {
  control?: Control<FormValues>;
}

const displayName = 'Step4';

export const Step4 = (props: Step4Props) => {
  const { control } = props;

  const dictionary = useDictionaryCtx(displayName);

  const { currentStep, updateStep } = useFormSteps();

  const [
    plan,
    onlineServiceAddon,
    largerStorageAddon,
    customizableProfileAddon,
  ] = useWatch({
    control,
    name: [
      'plan',
      'onlineServiceAddon',
      'largerStorageAddon',
      'customizableProfileAddon',
    ],
  });

  const total =
    (plan.price || 0) +
    ((onlineServiceAddon?.price || 0) +
      (largerStorageAddon?.price || 0) +
      (customizableProfileAddon?.price || 0));

  if (currentStep !== 4) return null;

  const hasAddons =
    !!onlineServiceAddon ||
    !!largerStorageAddon ||
    !!customizableProfileAddon;

  return (
    <>
      {plan.id && (
        <>
          <table className="bg-background w-full border-collapse rounded">
            <thead>
              <tr className="border-muted-6 border-b *:px-5 *:py-3">
                <th className="text-left">
                  <div className="flex flex-wrap items-start gap-x-2 gap-y-1">
                    <span className="font-medium capitalize">
                      {dictionary.step2.fields[plan.name].label} (
                      {dictionary.step2.fields.billing[plan.billing]}{' '}
                      )
                    </span>

                    <PointerEvents onPress={() => updateStep(2)}>
                      <button className="text-foreground/80 font-normal underline">
                        {dictionary.buttons.change}
                      </button>
                    </PointerEvents>
                  </div>
                </th>

                <th className="whitespace-nowrap text-right font-medium">
                  $ {plan.price}
                </th>
              </tr>
            </thead>

            <tbody>
              {[
                onlineServiceAddon && {
                  id: 1,
                  label: dictionary.step3.fields.onlineService.label,
                  value: onlineServiceAddon.price,
                },
                largerStorageAddon && {
                  id: 2,
                  label: dictionary.step3.fields.largerStorage.label,
                  value: largerStorageAddon.price,
                },
                customizableProfileAddon && {
                  id: 3,
                  label:
                    dictionary.step3.fields.customizableProfile.label,
                  value: customizableProfileAddon.price,
                },
              ].map((ele) =>
                !ele ? null : (
                  <tr
                    key={ele.id}
                    className="*:px-5 *:py-2 *:first:pt-7 [&:nth-last-child(2)>td]:pb-7"
                  >
                    <td className="text-left first-letter:uppercase">
                      {ele.label}
                    </td>
                    <td className="whitespace-nowrap text-right">
                      +$ {ele.value}
                    </td>
                  </tr>
                ),
              )}

              {hasAddons ? null : (
                <tr className="">
                  <td colSpan={2} className="h-32 p-5">
                    <div className="text-foreground/70 flex items-center justify-center font-medium">
                      <span className="text-balance text-center">
                        {dictionary.step4.noAddons}
                      </span>
                    </div>
                  </td>
                </tr>
              )}

              <tr className="border-muted-6 text-muted-12 border-t *:px-5 *:py-3">
                <td className="font-medium first-letter:uppercase">
                  {dictionary.step4.total} ({' '}
                  <span>
                    {dictionary.step2.fields.billing[plan.billing]}
                  </span>{' '}
                  )
                </td>

                <td className="whitespace-nowrap text-right font-medium">
                  $ {total}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}

      {plan.id ? null : (
        <p className="text-balance text-center text-lg">
          {dictionary.step4.noPlanSelected}{' '}
          <PointerEvents onPress={() => updateStep(2)}>
            <button className="hover:text-muted-12 underline hover:underline-offset-2">
              {dictionary.step4.step2}
            </button>
          </PointerEvents>
          .
        </p>
      )}
    </>
  );
};

Step4.displayName = displayName;
