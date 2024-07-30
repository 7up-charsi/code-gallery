import { i18nConfig as shoppingCartI18nConfig } from '@/shopping-cart/i18n.config';
import { i18nConfig as contactFormI18nConfig } from '@/contact-form/i18n.config';
import { i18nRouter } from './utils/i18n';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    /\/i18n\/.+\/contact-form.*/.test(pathname) ||
    /\/i18n\/contact-form.*/.test(pathname)
  ) {
    return i18nRouter(request, contactFormI18nConfig, 'contact-form');
  }

  if (
    /\/i18n\/.+\/shopping-cart.*/.test(pathname) ||
    /\/i18n\/shopping-cart.*/.test(pathname)
  ) {
    return i18nRouter(
      request,
      shoppingCartI18nConfig,
      'shopping-cart',
    );
  }
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
