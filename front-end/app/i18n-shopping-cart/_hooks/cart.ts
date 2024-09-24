import { ProductItem } from '../_types/product';
import { create } from 'zustand';

type Store = {
  items: { id: ProductItem['id']; amount: number }[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, type: 'add' | 'minus') => void;
  emptyCart: () => void;
};

export const useCart = create<Store>((set) => ({
  items: [],
  emptyCart: () => set({ items: [] }),
  addItem: (id) => {
    set((state) => ({
      items: [...state.items, { id, amount: 1 }],
    }));
  },
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((ele) => ele.id !== id),
    }));
  },
  updateItem: (id, type) => {
    set((state) => {
      const items = state.items.slice();

      for (let i = 0; i < items.length; i++) {
        const ele = items[i];

        if (ele.id === id) {
          const item = items[i];

          if (type === 'add') item.amount += 1;

          if (type === 'minus') {
            if (item.amount === 1) items.splice(i, 1);
            else item.amount -= 1;
          }

          break;
        }
      }

      return {
        items: items,
      };
    });
  },
}));
