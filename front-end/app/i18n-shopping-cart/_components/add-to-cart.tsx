'use client';

import {
  MinusIcon,
  PlusIcon,
  ShoppingBasketIcon,
} from 'lucide-react';
import { useDictionaryCtx } from './dictionary-provider';
import { Button } from '@typeweave/react/button';
import { useCart } from '../_hooks/cart';
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
    <div className="flex shrink-0 select-none justify-center">
      {itemAmount ? null : (
        <Button
          onPress={() => addItem(id)}
          startContent={<ShoppingBasketIcon />}
        >
          {dictionary.addToCart}
        </Button>
      )}

      {!itemAmount ? null : (
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            aria-label={`decrease amount of ${name}`}
            variant="text"
            onPress={() => updateItem(id, 'minus')}
          >
            <MinusIcon />
          </Button>

          <span className="bg-muted-9 size-8 content-center rounded text-center text-white">
            {itemAmount}
          </span>

          <Button
            isIconOnly
            aria-label={`increase amount of ${name}`}
            variant="text"
            onPress={() => updateItem(id, 'add')}
          >
            <PlusIcon />
          </Button>
        </div>
      )}
    </div>
  );
};

AddToCart.displayName = displayName;
