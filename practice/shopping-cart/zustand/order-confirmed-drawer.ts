import { create } from 'zustand';

type Store = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useOrderConfirmedDrawer = create<Store>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));
