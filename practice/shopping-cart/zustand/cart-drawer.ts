import { create } from 'zustand';

type Store = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
};

export const useCartDrawer = create<Store>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onOpenChange: (open) => set({ open }),
  onClose: () => set({ open: false }),
}));
