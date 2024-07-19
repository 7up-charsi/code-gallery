import { create } from 'zustand';

type Store = {
  totalSteps: number;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  updateStep: (step: number) => void;
  isThankYouStep: boolean;
  thankYouSetp: () => void;
};

export const useFormSteps = create<Store>((set) => ({
  totalSteps: 4,
  currentStep: 1,
  isThankYouStep: false,
  nextStep: () => {
    set((state) => ({
      currentStep: Math.min(state.totalSteps, state.currentStep + 1),
      isThankYouStep: false,
    }));
  },
  prevStep: () => {
    set((state) => ({
      currentStep: Math.max(1, state.currentStep - 1),
    }));
  },
  updateStep: (step) => {
    set((state) => ({
      currentStep: Math.max(Math.min(step, state.totalSteps), 1),
      isThankYouStep: false,
    }));
  },
  thankYouSetp: () => {
    set({ isThankYouStep: true });
  },
}));
