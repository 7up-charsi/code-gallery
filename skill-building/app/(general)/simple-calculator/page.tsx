'use client';

import { useCalculator } from './__internals/use-calculator';
import { Header } from './__internals/header';
import { Screen } from './__internals/screen';

export default function Home() {
  const insert = useCalculator((state) => state.insert);
  const del = useCalculator((state) => state.del);
  const reset = useCalculator((state) => state.reset);
  const getResult = useCalculator((state) => state.getResult);
  const setOperator = useCalculator((state) => state.setOperator);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-xs flex-col gap-2">
        <Header />
        <Screen />

        <div className="bg-sc-toggle_keypad_bg [&_button]:bg-sc-key_bg [&_button]:shadow-sc-keyShadow sc-theme1:[&_button]:text-sc-darkBlueText mt-2 grid h-64 grid-cols-4 grid-rows-5 gap-3 rounded-md p-5 [&_button]:flex [&_button]:items-center [&_button]:justify-center [&_button]:rounded-md [&_button]:font-bold [&_button]:shadow-[0_3px] [&_button]:outline-none focus-visible:[&_button]:ring-2 active:[&_button]:shadow-none">
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
            className="!bg-sc-del_reset_bg !shadow-sc-sc-del_reset_bg_shadow !text-white"
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
            className="!bg-sc-del_reset_bg !shadow-sc-sc-del_reset_bg_shadow col-span-2 !text-white"
            onClick={reset}
          >
            reset
          </button>
          <button
            type="button"
            className="!bg-sc-equal_toggleIndicator_bg !shadow-sc-equal_shadow col-span-2 !text-white"
            onClick={getResult}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
