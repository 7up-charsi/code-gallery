import { evaluate } from 'mathjs';
import { create } from 'zustand';

type Store = {
  value: string;
  reset: () => void;
  del: () => void;
  getResult: () => void;
  insert: (toInsert: string) => void;
};

const operators = ['-', '+', '/', '*'];

export const useCalculator = create<Store>((set) => ({
  value: '',
  reset: () => {
    set({ value: undefined });
  },

  del: () => {
    set((state) => {
      if (!state.value) return state;

      return { value: state.value?.slice(0, -1).trim() };
    });
  },
  getResult: () => {
    set((state) => {
      const result = evaluate(state.value);

      return { value: result + '' };
    });
  },
  insert: (toInsert) => {
    const isOperator = operators.includes(toInsert);

    set((state) => {
      // if user wants to insert minus at start e.g. -2
      if (isOperator && !state.value && toInsert === '-')
        return {
          value: '-',
        };

      // ignore all other operators at start
      if (isOperator && !state.value) return state;

      if (state.value === '-' && isOperator) return state;

      if (!state.value) return { value: toInsert };

      const lastChar = state.value.trim().at(-1);

      if (lastChar && operators.includes(lastChar) && isOperator)
        return {
          value:
            state.value.trim().slice(0, -1) + ' ' + toInsert + ' ',
        };

      if (isOperator)
        return {
          value: state.value + ' ' + toInsert + ' ',
        };

      return { value: state.value + toInsert };
    });
  },
}));
