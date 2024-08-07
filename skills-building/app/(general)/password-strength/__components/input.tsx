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
    <>
      <PasswordInput
        label="password"
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          setValue(val);
          debounced(val);
        }}
        placeholder="Type here..."
        className="w-full"
      />

      {strength ? null : (
        <>
          <div className="mt-3 h-1 w-full rounded bg-muted-3" />

          <div className='relative mx-auto mt-3 h-auto w-20 rounded bg-muted-3 text-xl before:whitespace-pre before:content-["_"]' />
        </>
      )}

      {!strength ? null : (
        <>
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted-3">
            <div
              data-strength={strength}
              className="h-full w-1/4 bg-[#E74C3C] data-[strength=medium]:w-1/2 data-[strength=strong]:w-3/4 data-[strength=strongest]:w-full data-[strength=medium]:bg-[#FFC107] data-[strength=strong]:bg-[#8BC34A] data-[strength=strongest]:bg-[#2ECC71]"
            ></div>
          </div>

          <div className="mt-3 text-center text-xl font-bold capitalize">
            {strength}
          </div>
        </>
      )}
    </>
  );
};

Input.displayName = displayName;
