'use client';

import {
  MenuContent,
  MenuPortal,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRoot,
  MenuTrigger,
} from '@typeweave/react/menu';
import { useCustomPathname } from '@/hooks/use-custom-pathname';
import { useParams, useRouter } from 'next/navigation';
import { ThemeLangButton } from './theme-lang-button';
import { Locales } from '@/types/dictionary';
import { i18nConfig } from '@/i18n-config';
import React from 'react';

interface LangSwitcherProps {}

const displayName = 'LangSwitcher';

const locales = {
  'en-US': 'eng',
  'pt-PT': 'por',
};

export const LangSwitcher = (props: LangSwitcherProps) => {
  const {} = props;

  const { locale } = useParams<{ locale: Locales }>();
  const pathname = useCustomPathname();
  const router = useRouter();

  return (
    <MenuRoot>
      <MenuTrigger>
        <ThemeLangButton>{locales[locale]}</ThemeLangButton>
      </MenuTrigger>

      <MenuPortal>
        <MenuContent className="z-[9999]">
          <MenuRadioGroup
            label="currency"
            hideLabel
            value={locale}
            onChange={(value) => {
              router.push(`/${value}${pathname}`);
            }}
          >
            {i18nConfig.locales.map((ele, i) => (
              <MenuRadioItem key={i} value={ele}>
                {locales[ele]}
              </MenuRadioItem>
            ))}
          </MenuRadioGroup>
        </MenuContent>
      </MenuPortal>
    </MenuRoot>
  );
};

LangSwitcher.displayName = displayName;
