import { i18nConfig } from '../i18n.config';

export type Locales = (typeof i18nConfig.locales)[number];

export type Dictionary = Partial<{
  title: string;
  description: string;
  mortgageAmount: string;
  mortgageTerm: string;
  interestRate: string;
  resetButton: string;
  type: string;
  mortgageType: string;
  repayment: string;
  interestOnly: string;
  monthlyHeading: string;
  totalHeading: string;
  interestOnlyHeading: string;
  zod: Record<string, string>;
  submitButton: string;
  ok: string;
  cancel: string;
  submitConfirmation: {
    title: string;
    description: string;
  };
  resetConfirmation: {
    title: string;
    description: string;
  };
  typeOptions: {
    repayment: string;
    interestOnly: string;
  };
}>;
