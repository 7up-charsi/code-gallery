import { Currencies } from '@/types/common';
import { create } from 'zustand';

type Store = {
  currency: Currencies;
  update: (currency: Currencies) => void;
};

const key = 'currency';

export const useCurrency = create<Store>((set) => ({
  currency:
    (globalThis?.localStorage?.getItem(key) as Currencies) ?? 'usd',
  update: (currency) => {
    set({ currency });
    globalThis?.localStorage?.setItem(key, currency);
  },
}));
