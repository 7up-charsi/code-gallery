'use client';

import { useCalculator } from '../_hooks/calculator';
import { Screen } from '../_components/screen';

export default function Home() {
  const insert = useCalculator((state) => state.insert);
  const del = useCalculator((state) => state.del);
  const reset = useCalculator((state) => state.reset);
  const getResult = useCalculator((state) => state.getResult);
  const setOperator = useCalculator((state) => state.setOperator);

  return (
    <div className="border-muted-6 bg-paper mx-auto mt-20 w-full max-w-xs rounded border p-3 shadow-md">
      <Screen />

      <div className="[&_button]:bg-muted-3 [&_button]:shadow-muted-8 mt-3 grid grid-cols-4 grid-rows-[repeat(5,35px)] gap-3 [&_button]:content-center [&_button]:rounded [&_button]:text-center [&_button]:font-bold [&_button]:shadow-[0_3px] [&_button]:outline-none focus-visible:[&_button]:ring-2 active:[&_button]:shadow-none">
        {/* row 1 */}
        <button type="button" onClick={() => insert(7)}>
          7
        </button>
        <button type="button" onClick={() => insert(8)}>
          8
        </button>
        <button type="button" onClick={() => insert(9)}>
          9
        </button>

        <button
          type="button"
          className="!bg-danger-3 !text-danger-11 !shadow-danger-8"
          onClick={del}
        >
          DEL
        </button>

        {/* row 2 */}
        <button type="button" onClick={() => insert(4)}>
          4
        </button>
        <button type="button" onClick={() => insert(5)}>
          5
        </button>
        <button type="button" onClick={() => insert(6)}>
          6
        </button>
        <button type="button" onClick={() => setOperator('+')}>
          +
        </button>

        {/* row 3 */}
        <button type="button" onClick={() => insert(1)}>
          1
        </button>
        <button type="button" onClick={() => insert(2)}>
          2
        </button>
        <button type="button" onClick={() => insert(3)}>
          3
        </button>
        <button type="button" onClick={() => setOperator('-')}>
          -
        </button>

        {/* row 4 */}
        <button type="button" onClick={() => insert('.')}>
          .
        </button>
        <button type="button" onClick={() => insert(0)}>
          0
        </button>
        <button type="button" onClick={() => setOperator('/')}>
          /
        </button>
        <button type="button" onClick={() => setOperator('x')}>
          x
        </button>

        {/* row 4 */}
        <button
          type="button"
          className="!bg-primary-3 text-primary-11 !shadow-primary-8 col-span-2"
          onClick={reset}
        >
          Reset
        </button>
        <button
          type="button"
          className="!bg-primary-3 text-primary-11 !shadow-primary-8 col-span-2"
          onClick={getResult}
        >
          =
        </button>
      </div>
    </div>
  );
}
