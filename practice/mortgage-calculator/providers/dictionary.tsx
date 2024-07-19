'use client';

import { createContextScope } from '@typeweave/react/context';
import { Dictionary } from '@/types';

interface ContextProps {
  dictionary: Dictionary;
}

const [DictionaryCtx, useDictionaryCtx] =
  createContextScope<ContextProps>('dictionary-provider');

export { useDictionaryCtx };

interface DictionaryProviderProps {
  children?: React.ReactNode;
  dictionary: Dictionary;
}

export const DictionaryProvider = (
  props: DictionaryProviderProps,
) => {
  const { children, dictionary } = props;

  return (
    <DictionaryCtx dictionary={dictionary}>{children}</DictionaryCtx>
  );
};
