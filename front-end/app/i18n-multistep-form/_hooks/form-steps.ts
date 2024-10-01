import { create } from 'zustand';

type Store = {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  updateStep: (step: number) => void;
};

export const useFormSteps = create<Store>((set) => ({
  currentStep: 1,
  nextStep: () => {
    set((state) => ({
      currentStep: Math.min(4, state.currentStep + 1),
    }));
  },
  prevStep: () => {
    set((state) => ({
      currentStep: Math.max(1, state.currentStep - 1),
    }));
  },
  updateStep: (step) => {
    set({
      currentStep: Math.max(Math.min(step, 4), 1),
    });
  },
}));
