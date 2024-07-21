'use client';

import {
  MenuContent,
  MenuPortal,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRoot,
  MenuTrigger,
} from '@typeweave/react/menu';
import { ThemeLangButton } from './theme-lang-button';
import { useCurrency } from '@/zustand/currency';
import { currencies } from '@/constants/common';
import { Currencies } from '@/types/common';
import React from 'react';

interface CurrencySwitcherProps {}

const displayName = 'CurrencySwitcher';

export const CurrencySwitcher = (props: CurrencySwitcherProps) => {
  const {} = props;

  const { currency, update } = useCurrency();

  return (
    <MenuRoot>
      <MenuTrigger>
        <ThemeLangButton>
          {/* {isMounted ? currency : '--'} */}
          {currency}
        </ThemeLangButton>
      </MenuTrigger>

      <MenuPortal>
        <MenuContent className="z-[9999]">
          <MenuRadioGroup
            label="currency"
            hideLabel
            value={currency}
            onChange={(value) => update(value as Currencies)}
          >
            {currencies.map((curr, i) => (
              <MenuRadioItem key={i} value={curr}>
                {curr}
              </MenuRadioItem>
            ))}
          </MenuRadioGroup>
        </MenuContent>
      </MenuPortal>
    </MenuRoot>
  );
};

CurrencySwitcher.displayName = displayName;
