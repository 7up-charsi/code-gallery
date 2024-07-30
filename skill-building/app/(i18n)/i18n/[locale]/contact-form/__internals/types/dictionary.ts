import { i18nConfig } from '@/i18n-config';

export type Locales = (typeof i18nConfig.locales)[number];

export type Dictionary = Partial<{
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  queryType: string;
  generalQuery: string;
  supportRequest: string;
  message: string;
  consent: string;
  submitButton: string;
  resetButton: string;
  zod: Record<string, string>;
}>;
