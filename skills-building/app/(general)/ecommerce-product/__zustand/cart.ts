import { create } from 'zustand';

type Store = {
  amount: number;
  increase: () => void;
  decrease: () => void;
  remove: () => void;
};

export const useCart = create<Store>((set) => ({
  amount: 0,
  increase: () => set((state) => ({ amount: state.amount + 1 })),
  decrease: () =>
    set((state) => ({ amount: Math.max(0, state.amount - 1) })),
  remove: () => set({ amount: 0 }),
}));
