import { i18nConfig } from '../i18n.config';

export type Locales = (typeof i18nConfig.locales)[number];

export type Dictionary = {
  step1: {
    title: string;
    description: string;
    fields: {
      name: { label: string };
      email: { label: string };
      phoneNumber: { label: string };
    };
  };
  step2: {
    title: string;
    description: string;
    fields: Record<string, { label: string }> & {
      billing: Record<string, string>;
    };
  };
  step3: {
    title: string;
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
    title: string;
    description: string;
    total: string;
    noAddons: string;
    noPlanSelected: string;
    step2: string;
  };
  buttons: {
    previous: string;
    next: string;
    confirm: string;
    change: string;
  };
  errors: Record<string, string>;
  thankYou: {
    title: string;
    description: string;
  };
};
