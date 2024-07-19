'use client';

import { createContextScope } from '@typeweave/react';
import { Dictionary } from '@/types/dictionary';

interface I18nProviderProps {
  dictionary: Dictionary;
  children?: React.ReactNode;
}

const [DictionaryCtx, useDictionaryCtx] =
  createContextScope<Dictionary>('dictinary provider');

export { useDictionaryCtx };

export const DictionaryProvider = (props: I18nProviderProps) => {
  const { children, dictionary } = props;

  return <DictionaryCtx {...dictionary}>{children}</DictionaryCtx>;
};
