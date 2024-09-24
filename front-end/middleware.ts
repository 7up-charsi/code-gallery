import { i18nConfig as mortgageCalculatorI18nConfig } from './app/i18n-mortgage-calculator/i18n.config';
import { i18nConfig as multistepFormI18nConfig } from './app/i18n-multistep-form/i18n.config';
import { i18nConfig as shoppingCartI18nConfig } from './app/i18n-shopping-cart/i18n.config';
import { i18nConfig as contactFormI18nConfig } from './app/i18n-contact-form/i18n.config';
import { createI18nRouter } from './utils/i18n';
import { I18nConfig } from './types/i18n';
import { NextRequest } from 'next/server';

const configs: Record<string, I18nConfig> = {
  'i18n-contact-form': contactFormI18nConfig,
  'i18n-shopping-cart': shoppingCartI18nConfig,
  'i18n-mortgage-calculator': mortgageCalculatorI18nConfig,
  'i18n-multistep-form': multistepFormI18nConfig,
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (/^\/i18n/.test(pathname)) {
    const i18nRouter = createI18nRouter(request);

    for (const name in configs) {
      if (Object.prototype.hasOwnProperty.call(configs, name)) {
        const config = configs[name];

        // regexp is faster than startsWith
        if (new RegExp(`/${name}.*`).test(pathname)) {
          return i18nRouter(name, config);
        }
      }
    }
  }
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
