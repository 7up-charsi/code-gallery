'use client';

import { useDictionaryCtx } from './dictionary-provider';
import { useFormSteps } from '../_hooks/form-steps';
import { Button } from '@typeweave/react/button';
import React from 'react';

interface StepperProps {
  onSubmit?: () => void;
}

const displayName = 'Stepper';

export const Stepper = (props: StepperProps) => {
  const { onSubmit } = props;

  const dictionary = useDictionaryCtx(displayName);

  const { currentStep, nextStep, prevStep } = useFormSteps();

  return (
    <div className="flex items-center gap-3 pt-10">
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

      {currentStep !== 4 && (
        <Button
          type="button"
          variant="solid"
          color="primary"
          onPress={nextStep}
        >
          {dictionary.buttons.next}
        </Button>
      )}

      {currentStep === 4 && (
        <Button
          type="button"
          variant="solid"
          color="primary"
          onPress={onSubmit}
        >
          {dictionary.buttons.confirm}
        </Button>
      )}
    </div>
  );
};

Stepper.displayName = displayName;
