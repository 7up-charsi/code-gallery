import { create } from 'zustand';

type Store = {
  amount: number;
  inputValue: number;
  updateInputValue: (type: 'inc' | 'dec') => void;
  clearCart: () => void;
  updateCart: () => void;
};

export const useCart = create<Store>((set) => ({
  amount: 0,
  inputValue: 1,
  updateInputValue: (type) => {
    if (type === 'inc')
      set((s) => ({ inputValue: s.inputValue + 1 }));

    if (type === 'dec')
      set((s) => ({ inputValue: s.inputValue - 1 }));
  },
  clearCart: () => {
    set({ amount: 0, inputValue: 1 });
  },
  updateCart: () => {
    set((s) => ({ amount: s.inputValue }));
  },
}));
