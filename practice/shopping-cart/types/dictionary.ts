import { i18nConfig } from '@/i18n-config';
import { ProductItem } from './product';

export type Locales = (typeof i18nConfig.locales)[number];

export type Dictionary = {
  title: string;
  data: ProductItem[];
  addToCart: string;
  yourCart: string;
  emptyCart: string;
  emptyCartDesc: string;
  orderTotal: string;
  confirmOrderButton: string;
  newOrderButton: string;
  orderConfirmed: string;
  orderConfirmedDesc: string;
};
