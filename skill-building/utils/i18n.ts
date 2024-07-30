import { match } from '@formatjs/intl-localematcher';
import { I18nConfig } from '@/types/i18n';
import { NextRequest } from 'next/server';
import Negotiator from 'negotiator';

export const getLocale = (
  request: NextRequest,
  config: I18nConfig,
) => {
  const negotiatorHeaders: Record<string, string> = {};

  request.headers.forEach(
    (value, key) => (negotiatorHeaders[key] = value),
  );

  let languages = new Negotiator({
    headers: negotiatorHeaders,
  }).languages();

  const { locales, defaultLocale } = config;

  return match(languages, locales, defaultLocale);
};

export const matchLocale = (
  languages: string[],
  config: I18nConfig,
) => {
  const { locales, defaultLocale } = config;

  return match(languages, locales, defaultLocale);
};
