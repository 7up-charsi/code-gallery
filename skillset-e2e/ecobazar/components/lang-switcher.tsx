'use client';

import { Combobox } from '@typeweave/react/combobox';
import { Input } from '@typeweave/react/input';
import React from 'react';

interface LangSwitcherProps {}

const displayName = 'LangSwitcher';

export const LangSwitcher = (props: LangSwitcherProps) => {
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

LangSwitcher.displayName = displayName;
