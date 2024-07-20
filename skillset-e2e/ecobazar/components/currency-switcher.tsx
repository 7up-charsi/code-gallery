'use client';

import { Combobox } from '@typeweave/react/combobox';
import { Input } from '@typeweave/react/input';
import React from 'react';

interface CurrencySwitcherProps {}

const displayName = 'CurrencySwitcher';

export const CurrencySwitcher = (props: CurrencySwitcherProps) => {
  const {} = props;

  return (
    <Combobox
      options={[]}
      disableClearable
      renderInput={(props) => (
        <Input
          label="language"
          hideLabel
          {...props}
          className="w-full"
        />
      )}
    />
  );
};

CurrencySwitcher.displayName = displayName;
