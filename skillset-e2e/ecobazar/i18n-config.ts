import { i18nRouter } from 'next-i18n-router';

export const i18nConfig = {
  locales: ['en-US', 'pt-PT'] as const,
  defaultLocale: 'en-US',
  prefixDefault: true,
} satisfies Parameters<typeof i18nRouter>[1];
