'use client';

import { checkPasswordStrength } from '../__utils/strength';
import { PasswordInput } from '@typeweave/react/input';
import debounce from 'lodash.debounce';
import React from 'react';

interface InputProps {}

const displayName = 'Input';

export const Input = (props: InputProps) => {
  const {} = props;

  const [value, setValue] = React.useState('');
  const [strength, setStrength] = React.useState('');

  const debounced = React.useMemo(
    () =>
      debounce((value: string) => {
        if (value) setStrength(checkPasswordStrength(value));
        else setStrength('');
      }, 500),
    [],
  );

  return (
    <PasswordInput
      label="password"
      value={value}
      onChange={(e) => {
        const val = e.target.value;
        setValue(val);
        debounced(val);
      }}
      placeholder="Type here..."
      className="relative w-full after:absolute after:-bottom-2 after:left-0 after:hidden after:h-1 after:w-1/4 after:rounded-full after:bg-[#E74C3C] after:transition-[width] data-[show=true]:after:block data-[strength=medium]:after:w-1/2 data-[strength=strong]:after:w-3/4 data-[strength=strongest]:after:w-full data-[strength=medium]:after:bg-[#FFC107] data-[strength=strong]:after:bg-[#8BC34A] data-[strength=strongest]:after:bg-[#2ECC71]"
      baseProps={{
        // @ts-ignore
        'data-show': !!value,
        'data-strength': strength,
      }}
    />
  );
};

Input.displayName = displayName;
