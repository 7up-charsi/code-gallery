import { i18nConfig } from '@/i18n-config';

export type Locales = (typeof i18nConfig.locales)[number];

export type Dictionary = {
  step1: {
    indicator: string;
    indicatorHeading: string;
    heading: string;
    description: string;
    fields: {
      name: { label: string };
      email: { label: string };
      phoneNumber: { label: string };
    };
  };
  step2: {
    indicator: string;
    indicatorHeading: string;
    heading: string;
    description: string;
    fields: {
      arcade: { label: string };
      advanced: { label: string };
      pro: { label: string };
      billing: {
        monthly: string;
        yearly: string;
      };
    };
  };
  step3: {
    indicator: string;
    indicatorHeading: string;
    heading: string;
    description: string;
    fields: {
      onlineService: {
        label: string;
        description: string;
      };
      largerStorage: {
        label: string;
        description: string;
      };
      customizableProfile: {
        label: string;
        description: string;
      };
    };
  };
  step4: {
    indicator: string;
    indicatorHeading: string;
    heading: string;
    description: string;
    total: string;
  };
  buttons: {
    previous: string;
    next: string;
    confirm: string;
    change: string;
    validate: string;
  };
  errors: Record<string, string>;
  thankYou: {
    heading: string;
    description: string;
  };
};
