'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import { CustomInput } from '@/app/custom-input';
import { InputProps } from '@typeweave/react';
import { TipButton } from './tip-button';
import { FormValues } from '@/app/page';
import React from 'react';

interface TipInputProps extends InputProps<false> {}

const displayName = 'TipInput';

export const TipInput = (props: TipInputProps) => {
  const {} = props;

  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<FormValues>();

  const isInput = useWatch({ name: 'isInput' });

  if (isInput) {
    return (
      <CustomInput
        label="custom tip"
        hideLabel
        autoFocus
        {...register('tip')}
        error={!!errors.tip}
      />
    );
  }

  return (
    <TipButton
      tip="custom"
      onPress={() => {
        setValue('tip', null);
        setValue('isInput', true);
      }}
    />
  );
};

TipInput.displayName = displayName;
