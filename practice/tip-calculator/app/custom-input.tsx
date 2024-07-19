'use client';

import { Input, InputProps } from '@typeweave/react';
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
        label: 'text-dark_grayish_cyan',
        inputWrapper:
          'bg-very_light_grayish_cyan data-[error=false]:border-none h-12',
        input:
          'text-2xl text-right font-semibold text-very_dark_cyan',
        helperText:
          'absolute right-0 font-semibold text-sm top-0 h-auto ',
      }}
    />
  );
});

CustomInput.displayName = displayName;
