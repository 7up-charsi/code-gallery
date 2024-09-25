'use client';

import { Button } from '@typeweave/react/button';
import { ShoppingCartIcon } from 'lucide-react';
import { useCart } from '../_hooks/cart';
import { toast } from 'react-toastify';
import React from 'react';

interface AddToCartButtonProps {}

const displayName = 'AddToCartButton';

export const AddToCartButton = (props: AddToCartButtonProps) => {
  const {} = props;

  const { inputValue, amount, updateCart } = useCart();

  return (
    <Button
      variant="solid"
      className="grow"
      startContent={<ShoppingCartIcon />}
      disabled={amount === inputValue}
      onPress={() => {
        updateCart();

        if (amount === inputValue) return;

        if (amount) {
          toast.success('cart updated', {
            position: 'top-right',
            autoClose: 2000,
          });
        } else {
          toast.success('added into cart', {
            position: 'top-right',
            autoClose: 2000,
          });
        }
      }}
    >
      {amount ? 'update cart' : 'add to cart'}
    </Button>
  );
};

AddToCartButton.displayName = displayName;
