'use client';

import {
  MenuContent,
  MenuPortal,
  MenuRoot,
  MenuTrigger,
} from '@typeweave/react/menu';
import { ThemeLangButton } from './theme-lang-button';
import React from 'react';

interface LangSwitcherProps {}

const displayName = 'LangSwitcher';

export const LangSwitcher = (props: LangSwitcherProps) => {
  const {} = props;

  return (
    <MenuRoot>
      <MenuTrigger>
        <ThemeLangButton>eng</ThemeLangButton>
      </MenuTrigger>

      <MenuPortal>
        <MenuContent className="z-[9999]"></MenuContent>
      </MenuPortal>
    </MenuRoot>
  );
};

LangSwitcher.displayName = displayName;
