'use client';

import { createContextScope } from '@typeweave/react/context';
import { Dictionary } from '@/types/dictionary';
import React from 'react';

interface DictionaryProviderProps {
  dictionary: Dictionary;
  children?: React.ReactNode;
}

const [DictionaryCtx, useDictionaryCtx] =
  createContextScope<Dictionary>('dictionary-provider');

export { useDictionaryCtx };

export const DictionaryProvider = (
  props: DictionaryProviderProps,
) => {
  const { dictionary, children } = props;

  return <DictionaryCtx {...dictionary}>{children}</DictionaryCtx>;
};
