import { Currencies } from '@/types/common';
import { create } from 'zustand';

type Store = {
  currency: Currencies;
  update: (currency: Currencies) => void;
};

export const useCurrency = create<Store>((set) => ({
  currency: 'usd',
  update: (currency) => set({ currency }),
}));
