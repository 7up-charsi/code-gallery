import { i18nConfig as contactFormI18nConfig } from '@/contact-form/i18n.config';
import { NextRequest, NextResponse } from 'next/server';
import { matchLocale } from './utils/i18n';

const localeRegex = /\/i18n\/([^/]+)/;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (/\/i18n\/.+\/contact-form.*/.test(pathname)) {
    const { 1: locale = '' } = pathname.match(localeRegex) || [];

    if (contactFormI18nConfig.locales.includes(locale as never))
      return;

    const matchedLocale = matchLocale(
      [locale],
      contactFormI18nConfig,
    );

    const newPathname = pathname.replace(
      /\/i18n\/[^/]+/,
      `/i18n/${matchedLocale}`,
    );

    const newUrl = new URL(newPathname, request.url);

    return NextResponse.redirect(newUrl);
  }
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
