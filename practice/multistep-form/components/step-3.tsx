'use client';

import { CustomizableProfileAddon } from './customizable-profile-addon';
import { OnlineServiceAddon } from './online-service-addon';
import { LargerStorageAddon } from './larger-storage-addon';
import { useDictionaryCtx } from '@/providers/dictionary';
import { useFormSteps } from '@/zustand/form-steps';
import { StepHeader } from './step-header';
import React from 'react';

interface Step3Props {}

const displayName = 'Step3';

export const Step3 = (props: Step3Props) => {
  const {} = props;

  const dictionary = useDictionaryCtx(displayName);

  const { currentStep, isThankYouStep } = useFormSteps();

  if (currentStep !== 3 || isThankYouStep) return null;

  return (
    <>
      <StepHeader
        heading={dictionary.step2.heading}
        desc={dictionary.step2.description}
      />

      <div className="space-y-3">
        <OnlineServiceAddon />
        <LargerStorageAddon />
        <CustomizableProfileAddon />
      </div>
    </>
  );
};

Step3.displayName = displayName;
