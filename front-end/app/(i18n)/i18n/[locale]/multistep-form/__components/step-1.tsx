'use client';

import { useDictionaryCtx } from './dictionary-provider';
import { useFormSteps } from '../__zustand/form-steps';
import { useFormContext } from 'react-hook-form';
import { Input } from '@typeweave/react/input';
import { StepHeader } from './step-header';
import { FormValues } from '../page';
import React from 'react';

interface Step1Props {}

const displayName = 'Step1';

export const Step1 = (props: Step1Props) => {
  const {} = props;

  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  const dictionary = useDictionaryCtx(displayName);

  const { currentStep, isThankYouStep } = useFormSteps();

  if (currentStep !== 1 || isThankYouStep) return null;

  return (
    <>
      <StepHeader
        heading={dictionary.step1.heading}
        desc={dictionary.step1.description}
      />

      <Input
        label={dictionary.step1.fields.name.label}
        {...register('name')}
        placeholder="e.g. Lorem Ipsum"
        className="w-full"
        error={!!errors.name}
        helperText={dictionary.errors[errors.name?.message!] ?? ' '}
      />

      <Input
        label={dictionary.step1.fields.email.label}
        {...register('email')}
        inputMode="email"
        placeholder="e.g. lorem.ipsum@lorem.com"
        className="w-full"
        error={!!errors.email}
        helperText={dictionary.errors[errors.email?.message!] ?? ' '}
      />

      <Input
        label={dictionary.step1.fields.phoneNumber.label}
        {...register('phoneNumber')}
        inputMode="tel"
        placeholder="e.g. +1234567890"
        className="w-full"
        error={!!errors.phoneNumber}
        helperText={
          dictionary.errors[errors.phoneNumber?.message!] ?? ' '
        }
      />
    </>
  );
};

Step1.displayName = displayName;
