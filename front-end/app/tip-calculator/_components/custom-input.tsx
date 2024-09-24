'use client';

import { Input, InputProps } from '@typeweave/react/input';
import React from 'react';

interface CustomInputProps
  extends Omit<InputProps<false>, 'className' | 'classNames'> {}

const displayName = 'CustomInput';

export const CustomInput = React.forwardRef<
  HTMLInputElement,
  CustomInputProps
>((props, forwardedRef) => {
  const { ...restProps } = props;

  return (
    <Input
      ref={forwardedRef}
      {...restProps}
      className="relative max-h-full w-full"
      classNames={{
        label: 'text-primary-12',
        inputWrapper:
          'bg-primary-3 data-[error=false]:border-none h-12 focus-within:ring-primary-9',
        input: 'text-2xl text-right font-semibold text-primary-12',
        helperText:
          'absolute right-0 font-semibold text-sm top-0 h-auto ',
      }}
    />
  );
});

CustomInput.displayName = displayName;
