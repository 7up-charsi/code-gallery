'use client';

import { PointerEvents } from '@typeweave/react/pointer-events';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useCart } from '../_hooks/cart';
import React from 'react';

const displayName = 'AmountButtons';

export const AmountButtons = () => {
  const { updateInputValue, inputValue } = useCart();

  return (
    <div className="bg-muted-3 flex h-9 grow items-center rounded">
      <PointerEvents onPress={() => updateInputValue('dec')}>
        <button
          aria-label="remove 1 from cart"
          disabled={inputValue === 1}
          className="ring-focus hover:bg-muted-4 active:bg-muted-5 disabled:disabled flex h-full w-10 cursor-pointer items-center justify-center rounded-l outline-none focus-visible:ring-2"
        >
          <MinusIcon size={20} />
        </button>
      </PointerEvents>

      <span className="text-muted-12 min-w-16 grow select-none px-1 text-center font-bold">
        {inputValue}
      </span>

      <PointerEvents onPress={() => updateInputValue('inc')}>
        <button
          aria-label="add 1 in cart"
          className="ring-focus hover:bg-muted-4 active:bg-muted-5 disabled:disabled flex h-full w-10 cursor-pointer items-center justify-center rounded-r outline-none focus-visible:ring-2"
        >
          <PlusIcon size={20} />
        </button>
      </PointerEvents>
    </div>
  );
};

AmountButtons.displayName = displayName;
