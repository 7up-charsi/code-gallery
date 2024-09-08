import { create } from 'zustand';

type Store = {
  operandLeft?: string;
  operandRight?: string;
  operator?: string;
  result?: number;
  reset: () => void;
  del: () => void;
  getResult: () => void;
  insert: (digit: number | string) => void;
  setOperator: (operator: string) => void;
};

export const useCalculator = create<Store>((set) => ({
  reset: () =>
    set({
      operandLeft: undefined,
      operandRight: undefined,
      operator: undefined,
      result: undefined,
    }),
  setOperator: (operator) => {
    set((state) => {
      if (!state.operandLeft) return state;

      if (state.result) {
        return {
          operandLeft: state.result + '',
          result: undefined,
          operator,
        };
      }

      return { operator };
    });
  },
  del: () => {
    set((state) => {
      if (state.operator) {
        return {
          operandRight: state.operandRight?.slice(
            0,
            state.operandRight.length - 1,
          ),
        };
      }

      return {
        operandLeft: state.operandLeft?.slice(
          0,
          state.operandLeft.length - 1,
        ),
      };
    });
  },
  getResult: () => {
    set((state) => {
      if (state.operandLeft && state.operandRight) {
        let result: number | undefined = undefined;

        switch (state.operator) {
          case '+':
            result = +state.operandLeft + +state.operandRight;
            break;
          case '-':
            result = +state.operandLeft - +state.operandRight;
            break;
          case 'x':
            result = +state.operandLeft * +state.operandRight;
            break;
          case '/':
            result = +state.operandLeft / +state.operandRight;
            break;
          default:
            break;
        }

        return {
          result,
          operandLeft: undefined,
          operandRight: undefined,
          operator: undefined,
        };
      }

      return state;
    });
  },
  insert: (digit) => {
    set((state) => {
      if (state.operator) {
        return {
          operandRight: `${state.operandRight || ''}${digit}`,
          result: undefined,
        };
      }

      return {
        operandLeft: `${state.operandLeft || ''}${digit}`,
        result: undefined,
      };
    });
  },
}));
