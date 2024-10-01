import { Dictionary, Locales } from '../_types/dictionary';

export const getDictionary = async (
  locale: Locales,
): Promise<Dictionary> => {
  return import(`../_dictionaries/${locale}.json`).then(
    (module) => module.default,
  );
};
