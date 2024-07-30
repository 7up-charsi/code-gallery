import { Dictionary, Locales } from '../__types/dictionary';

const dictionaries: Record<Locales, () => Promise<Dictionary>> = {
  'en-US': () =>
    import('../__dictionaries/en-US.json').then(
      (module) => module.default,
    ),
  'pt-PT': () =>
    import('../__dictionaries/pt-PT.json').then(
      (module) => module.default,
    ),
};

export const getDictionary = async (locale: Locales) =>
  dictionaries[locale]();
