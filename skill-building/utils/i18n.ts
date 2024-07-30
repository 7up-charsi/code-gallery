import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import { I18nConfig } from '@/types/i18n';
import Negotiator from 'negotiator';

export const i18nRouter = (
  request: NextRequest,
  config: I18nConfig,
  name: string,
) => {
  const pathname = request.nextUrl.pathname;

  const { 1: currentLocale = '' } =
    pathname.match(new RegExp(`/i18n/([^/]+)/${name}`)) || [];

  if (
    currentLocale &&
    config.locales.includes(currentLocale as never)
  )
    return;

  const negotiatorHeaders: Record<string, string> = {};

  request.headers.forEach(
    (value, key) => (negotiatorHeaders[key] = value),
  );

  let languages = new Negotiator({
    headers: negotiatorHeaders,
  }).languages();

  const { locales, defaultLocale } = config;

  const newLocale = match(languages, locales, defaultLocale);

  const newPathname = `/i18n/${newLocale}/${name}`;

  const newUrl = new URL(newPathname, request.url);

  return NextResponse.redirect(newUrl);
};
