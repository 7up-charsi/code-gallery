'use client';

import { useOrderConfirmedDialog } from '../__zustand/order-confirmed-dialog';
import { useOrderConfirmedDrawer } from '../__zustand/order-confirmed-drawer';
import { useCartDrawer } from '../__zustand/cart-drawer';
import { useDictionaryCtx } from './dictionary-provider';
import { Button } from '@typeweave/react/button';
import { TreeDeciduousIcon } from 'lucide-react';
import { useCart } from '../__zustand/cart';
import React, { Fragment } from 'react';
import { CartItem } from './cart-item';

interface CartProps {}

const displayName = 'Cart';

export const Cart = (props: CartProps) => {
  const {} = props;

  const titleId = React.useId();
  const descId = React.useId();

  const cartDrawerState = useCartDrawer();
  const confirmedDialogOpen = useOrderConfirmedDialog(
    (state) => state.onOpen,
  );
  const confirmedDrawerOpen = useOrderConfirmedDrawer(
    (state) => state.onOpen,
  );

  const { data, ...dictionary } = useDictionaryCtx(displayName);

  const items = useCart((state) => state.items);

  const itemsInCart = items.reduce(
    (acc, item) => ((acc += item.amount), acc),
    0,
  );

  const total = items.reduce((acc, { id, amount }) => {
    const item = data.find((ele) => ele.id === id)!;

    return (acc += item.price * amount), acc;
  }, 0);

  return (
    <aside
      aria-labelledby={titleId}
      aria-describedby={descId}
      className="grid w-full grid-cols-[20px_1fr_20px] rounded py-5"
    >
      <div className="col-start-2 flex items-center justify-between">
        <h2
          id={titleId}
          className="whitespace-nowrap text-lg font-semibold capitalize text-primary-11"
        >
          {itemsInCart
            ? `${dictionary.yourCart} (${itemsInCart})`
            : dictionary.emptyCart}
        </h2>

        <Button
          size="sm"
          variant="text"
          color="danger"
          onPress={cartDrawerState.onClose}
          className="lg:hidden"
        >
          close
        </Button>
      </div>

      <div
        data-have-items={!!items.length}
        className="col-span-3 mt-5 overflow-auto border-muted-6 pb-2 data-[have-items=true]:border-b"
      >
        <div className="scrollbar-thin h-full space-y-3 overflow-auto px-5">
          {items.map(({ id, amount }, i, arr) => {
            const item = data.find((ele) => ele.id === id)!;

            return (
              <Fragment key={item.id}>
                <CartItem {...item} amount={amount} />

                {i === arr.length - 1 ? null : (
                  <hr className="border-muted-6" />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>

      {items.length ? null : (
        <div
          id={descId}
          className="col-start-2 flex h-16 items-center justify-center text-balance text-center text-lg font-medium"
        >
          {dictionary.emptyCartDesc}
        </div>
      )}

      {!items.length ? null : (
        <>
          <div className="col-start-2 flex h-16 items-center justify-between gap-5">
            <span className="text-lg font-medium capitalize">
              {dictionary.orderTotal}
            </span>

            <span
              className="text-2xl font-semibold"
              aria-label={`Total amount is $${total}`}
            >
              ${total}
            </span>
          </div>

          <div
            className="col-start-2 mt-2 flex justify-center gap-2 rounded bg-primary-2 px-3 py-5 text-center text-sm"
            aria-labelledby="carbon-neutral"
          >
            <TreeDeciduousIcon className="text-success-11" />
            <span id="carbon-neutral">
              This is a <b>carbon-neutral</b> delivery
            </span>
          </div>

          <Button
            color="primary"
            variant="solid"
            className="col-start-2 mt-2 w-full rounded-full lg:hidden"
            onPress={() => {
              cartDrawerState.onClose();
              confirmedDrawerOpen();
            }}
          >
            {dictionary.confirmOrderButton}
          </Button>

          <Button
            color="primary"
            variant="solid"
            className="col-start-2 mt-2 w-full rounded-full max-lg:hidden"
            onPress={() => {
              confirmedDialogOpen();
            }}
          >
            {dictionary.confirmOrderButton}
          </Button>
        </>
      )}
    </aside>
  );
};

Cart.displayName = displayName;
