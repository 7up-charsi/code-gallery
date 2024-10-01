import { i18nConfig } from '../i18n.config';
import { ProductItem } from './product';

export type Locales = (typeof i18nConfig.locales)[number];

export type Dictionary = {
  title: string;
  data: ProductItem[];
  addToCart: string;
  emptyCart: string;
  total: string;
  confirmOrderButton: string;
  orderConfirmed: string;
  orderConfirmedDesc: string;
  cart: string;
};
