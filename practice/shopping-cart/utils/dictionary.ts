import { Dictionary, Locales } from '@/types/dictionary';

const dictionaries: Record<Locales, () => Promise<Dictionary>> = {
  'en-US': () =>
    import('@/dictionaries/en-US.json').then(
      (module) => module.default,
    ),
  'pt-PT': () =>
    import('@/dictionaries/pt-PT.json').then(
      (module) => module.default,
    ),
};

export const getDictionary = async (locale: Locales) =>
  dictionaries[locale]();
