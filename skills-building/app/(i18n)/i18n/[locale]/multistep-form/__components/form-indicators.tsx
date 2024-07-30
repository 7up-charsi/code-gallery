'use client';

import { PointerEvents } from '@typeweave/react/pointer-events';
import { useDictionaryCtx } from './dictionary-provider';
import { useFormSteps } from '../__zustand/form-steps';
import { useFormContext } from 'react-hook-form';
import React from 'react';

interface FormIndicatorsProps {}

const displayName = 'FormIndicators';

export const FormIndicators = (props: FormIndicatorsProps) => {
  const {} = props;

  const dictionary = useDictionaryCtx(displayName);

  const { currentStep, totalSteps, updateStep, isThankYouStep } =
    useFormSteps();

  const {
    formState: { submitCount, errors },
  } = useFormContext();

  const hasErrors = !!Object.keys(errors).length;

  return (
    <aside
      aria-label="form indicators"
      className="h-52 w-full bg-[url(/assets/multistep-form/bg-sidebar-mobile.svg)] bg-cover pt-5 md:h-full md:rounded-xl md:bg-[url(/assets/multistep-form/bg-sidebar-desktop.svg)]"
    >
      <div
        data-disabled={isThankYouStep}
        className="mt-5 flex items-center justify-center gap-4 data-[disabled=true]:disabled md:flex-col md:items-start md:px-5"
      >
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            data-disabled={i === 3 && (!submitCount || hasErrors)}
            className="flex items-center gap-3 data-[disabled=true]:disabled"
          >
            <PointerEvents onPress={() => updateStep(i + 1)}>
              <button
                aria-label={`${i + 1} step`}
                color="primary"
                data-active={currentStep === i + 1}
                className="size-9 cursor-pointer rounded-full border border-white text-white outline-none ring-focus hover:bg-white/20 focus-visible:ring-2 active:bg-white/40 data-[active=true]:bg-white data-[active=true]:text-primary-11"
                disabled={isThankYouStep}
              >
                {i + 1}
              </button>
            </PointerEvents>

            <div className="flex flex-col text-white max-md:hidden">
              <span className="text-sm uppercase text-white/80">
                {/* @ts-ignore */}
                {dictionary[`step${i + 1}`].indicator}
              </span>

              {i + 1 === 1 && (
                <span className="text-sm font-semibold uppercase">
                  {dictionary.step1.indicatorHeading}
                </span>
              )}
              {i + 1 === 2 && (
                <span className="text-sm font-semibold uppercase">
                  {dictionary.step2.indicatorHeading}
                </span>
              )}
              {i + 1 === 3 && (
                <span className="text-sm font-semibold uppercase">
                  {dictionary.step3.indicatorHeading}
                </span>
              )}
              {i + 1 === 4 && (
                <span className="text-sm font-semibold uppercase">
                  {dictionary.step4.indicatorHeading}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

FormIndicators.displayName = displayName;
