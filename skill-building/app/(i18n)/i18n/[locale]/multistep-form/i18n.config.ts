import { I18nConfig } from '@/types/i18n';

export const i18nConfig = {
  locales: ['en-US', 'pt-PT'] as const,
  defaultLocale: 'en-US',
} satisfies I18nConfig;
