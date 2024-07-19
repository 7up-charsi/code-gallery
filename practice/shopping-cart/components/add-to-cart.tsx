'use client';

import {
  MinusIcon,
  PlusIcon,
  ShoppingBasketIcon,
} from 'lucide-react';
import { PointerEvents } from '@typeweave/react/pointer-events';
import { useDictionaryCtx } from '@/providers/dictionary';
import { useCart } from '@/zustand/cart';
import React from 'react';

interface AddToCartProps {
  name: string;
  id: string;
}

const displayName = 'AddToCart';

export const AddToCart = (props: AddToCartProps) => {
  const { name, id } = props;

  const itemAmount = useCart((state) => {
    return state.items.find((ele) => ele.id === id)?.amount;
  });

  const addItem = useCart((state) => state.addItem);
  const updateItem = useCart((state) => state.updateItem);

  const dictionary = useDictionaryCtx(displayName);

  return (
    <div className="absolute top-full flex w-full -translate-y-1/2 justify-center">
      {itemAmount ? null : (
        <PointerEvents onPress={() => addItem(id)}>
          <button
            aria-label={`add to cart ${name}`}
            className="outline-one flex h-11 items-center justify-center gap-2 whitespace-pre rounded-full border border-muted-9 bg-white px-5 outline-none ring-focus hover:bg-muted-3 focus-visible:ring-2 active:bg-muted-4 dark:text-muted-2"
          >
            <ShoppingBasketIcon
              size={20}
              className="text-primary-11"
            />
            <span>{dictionary.addToCart}</span>
          </button>
        </PointerEvents>
      )}

      {!itemAmount ? null : (
        <div className="flex h-11 items-center rounded-full bg-primary-9 px-5">
          <PointerEvents onPress={() => updateItem(id, 'minus')}>
            <button
              aria-label={`remove 1 ${name}`}
              className="flex size-6 items-center justify-center rounded-full border border-white bg-transparent text-white outline-none ring-focus hover:bg-primary-8/80 focus-visible:ring-2 active:bg-primary-8"
            >
              <MinusIcon size={17} />
            </button>
          </PointerEvents>

          <span className="h-full min-w-10 content-center px-1 text-center text-lg text-white">
            {itemAmount}
          </span>

          <PointerEvents onPress={() => updateItem(id, 'add')}>
            <button
              aria-label={`add 1 ${name}`}
              className="flex size-6 items-center justify-center rounded-full border border-white bg-transparent text-white outline-none ring-focus hover:bg-primary-8/80 focus-visible:ring-2 active:bg-primary-8"
            >
              <PlusIcon size={17} />
            </button>
          </PointerEvents>
        </div>
      )}
    </div>
  );
};

AddToCart.displayName = displayName;
