import { i18nConfig as mortgageCalculatorI18nConfig } from '@/mortgage-calculator/i18n.config';
import { i18nConfig as shoppingCartI18nConfig } from '@/shopping-cart/i18n.config';
import { i18nConfig as contactFormI18nConfig } from '@/contact-form/i18n.config';
import { createI18nRouter, createRouteChecker } from './utils/i18n';
import { I18nConfig } from './types/i18n';
import { NextRequest } from 'next/server';

const configs: Record<string, I18nConfig> = {
  'contact-form': contactFormI18nConfig,
  'shopping-cart': shoppingCartI18nConfig,
  'mortgage-calculator': mortgageCalculatorI18nConfig,
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const checkRoute = createRouteChecker(pathname);
  const i18nRouter = createI18nRouter(request);

  for (const name in configs) {
    if (Object.prototype.hasOwnProperty.call(configs, name)) {
      const config = configs[name];

      if (checkRoute(name)) {
        return i18nRouter(name, config);
      }
    }
  }
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
