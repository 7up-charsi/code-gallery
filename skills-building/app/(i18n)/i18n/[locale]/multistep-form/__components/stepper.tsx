'use client';

import { useDictionaryCtx } from './dictionary-provider';
import { useFormSteps } from '../__zustand/form-steps';
import { Button } from '@typeweave/react/button';
import { useFormContext } from 'react-hook-form';
import React from 'react';

interface StepperProps {
  onSubmit?: () => void;
}

const displayName = 'Stepper';

export const Stepper = (props: StepperProps) => {
  const { onSubmit } = props;

  const dictionary = useDictionaryCtx(displayName);

  const {
    formState: { submitCount, errors },
  } = useFormContext();

  const hasErrors = !!Object.keys(errors).length;

  const {
    currentStep,
    nextStep,
    prevStep,
    totalSteps,
    isThankYouStep,
    thankYouSetp,
  } = useFormSteps();

  if (isThankYouStep) return;

  return (
    <div className="flex items-center gap-3">
      {currentStep !== 1 && (
        <Button
          type="button"
          variant="text"
          color="primary"
          onPress={prevStep}
        >
          {dictionary.buttons.previous}
        </Button>
      )}

      <div className="grow"></div>

      {currentStep !== totalSteps && (
        <Button
          type="button"
          variant="solid"
          color="primary"
          onPress={() => {
            if (currentStep === 3 && (!submitCount || hasErrors))
              onSubmit?.();
            else nextStep();
          }}
        >
          {currentStep === 3 && (!submitCount || hasErrors)
            ? dictionary.buttons.validate
            : dictionary.buttons.next}
        </Button>
      )}

      {currentStep === totalSteps && (
        <Button
          type="button"
          variant="solid"
          color="primary"
          onPress={() => {
            onSubmit?.();
            thankYouSetp();
          }}
        >
          {dictionary.buttons.confirm}
        </Button>
      )}
    </div>
  );
};

Stepper.displayName = displayName;
