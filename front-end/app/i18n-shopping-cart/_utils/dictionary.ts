import { Dictionary, Locales } from '../_types/dictionary';

const dictionaries: Record<Locales, () => Promise<Dictionary>> = {
  'en-US': () =>
    import('../_dictionaries/en-US.json').then(
      (module) => module.default,
    ),
  'pt-PT': () =>
    import('../_dictionaries/pt-PT.json').then(
      (module) => module.default,
    ),
};

export const getDictionary = async (locale: Locales) =>
  dictionaries[locale]();
