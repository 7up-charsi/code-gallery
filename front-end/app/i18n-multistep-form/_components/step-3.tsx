'use client';

import { CustomizableProfileAddon } from './customizable-profile-addon';
import { OnlineServiceAddon } from './online-service-addon';
import { LargerStorageAddon } from './larger-storage-addon';
import { useFormSteps } from '../_hooks/form-steps';
import React from 'react';

const displayName = 'Step3';

export const Step3 = () => {
  const { currentStep } = useFormSteps();

  if (currentStep !== 3) return null;

  return (
    <div className="bg-background rounded p-5">
      <OnlineServiceAddon />
      <LargerStorageAddon />
      <CustomizableProfileAddon />
    </div>
  );
};

Step3.displayName = displayName;
