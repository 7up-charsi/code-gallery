import { ChevronDownIcon, MapPinIcon } from 'lucide-react';
import { CurrencySwitcher } from './currency-switcher';
import { LangSwitcher } from './lang-switcher';
import { address } from '@/constants/common';
import React from 'react';

interface UtilityBarProps {}

const displayName = 'UtilityBar';

export const UtilityBar = (props: UtilityBarProps) => {
  const {} = props;

  return (
    <div
      aria-label="utility bar"
      className="flex h-9 items-center border-b border-muted-6 px-10 max-lg:hidden"
    >
      <address>
        <MapPinIcon
          size={15}
          className="mr-1 inline-block text-danger-11/70"
        />
        <span className="text-xs">{address}</span>
      </address>

      <div className="grow"></div>

      <LangSwitcher />
      <div className="mx-1"></div>
      <CurrencySwitcher />

      <div className="mx-4 h-4/5 w-[2px] rounded-full bg-muted-6"></div>

      <button className="h-6 rounded px-1 text-sm outline-none ring-focus hover:bg-muted-3 focus-visible:ring-2 active:bg-muted-5">
        Signin/Signup
      </button>
    </div>
  );
};

UtilityBar.displayName = displayName;
