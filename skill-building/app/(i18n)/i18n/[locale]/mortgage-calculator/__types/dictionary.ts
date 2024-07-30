import { i18nConfig } from '../i18n.config';

export type Locales = (typeof i18nConfig.locales)[number];

export type Dictionary = Partial<{
  title: string;
  mortgageAmount: string;
  mortgageTerm: string;
  interestRate: string;
  calculateButton: string;
  resetButton: string;
  mortgageType: string;
  repayment: string;
  interestOnly: string;
  emptyResultHeading: string;
  emptyResultDescription: string;
  resultHeading: string;
  resultDescription: string;
  monthlyHeading: string;
  totalHeading: string;
  interestOnlyHeading: string;
  zod: Record<string, string>;
}>;
