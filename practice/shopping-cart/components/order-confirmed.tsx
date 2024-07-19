'use client';

import { useOrderConfirmedDialog } from '@/zustand/order-confirmed-dialog';
import { useOrderConfirmedDrawer } from '@/zustand/order-confirmed-drawer';
import { OrderConfirmedItem } from './order-confirmed-item';
import { useDictionaryCtx } from '@/providers/dictionary';
import { CheckCircleIcon } from 'lucide-react';
import { Button } from '@typeweave/react';
import { useCart } from '@/zustand/cart';
import React, { Fragment } from 'react';

interface OrderConfirmedProps {
  titleId?: string;
  descId?: string;
}

const displayName = 'OrderConfirmed';

export const OrderConfirmed = (props: OrderConfirmedProps) => {
  const { descId: descIdProp, titleId: titleIdProp } = props;

  const titleId = React.useId();
  const descId = React.useId();

  const onDialogClose = useOrderConfirmedDialog(
    (state) => state.onClose,
  );
  const onDrawerClose = useOrderConfirmedDrawer(
    (state) => state.onClose,
  );

  const { data, ...dictionary } = useDictionaryCtx(displayName);

  const items = useCart((state) => state.items);
  const emptyCart = useCart((state) => state.emptyCart);

  const total = items.reduce((acc, { id, amount }) => {
    const item = data.find((ele) => ele.id === id)!;

    return (acc += item.price * amount), acc;
  }, 0);

  return (
    <aside
      aria-labelledby={titleIdProp ?? titleId}
      aria-describedby={descIdProp ?? descId}
      className="grid w-full grid-cols-[20px_1fr_20px] overflow-auto rounded bg-background py-5"
    >
      <div className="col-start-2 flex items-center gap-3">
        <CheckCircleIcon className="text-success-11" />
        <h2
          id={titleId}
          className="whitespace-nowrap text-lg font-semibold capitalize text-primary-11"
        >
          {dictionary.orderConfirmed}
        </h2>
      </div>

      <div id={descId} className="col-start-2 mt-2 text-muted-11/80">
        {dictionary.orderConfirmedDesc}
      </div>

      <div className="col-span-3 mt-5 overflow-auto border-b border-muted-6 pb-2">
        <div className="h-full space-y-3 overflow-auto px-5 scrollbar-thin">
          {items.map(({ id, amount }, i, arr) => {
            const item = data.find((ele) => ele.id === id)!;

            return (
              <Fragment key={item.id}>
                <OrderConfirmedItem {...item} amount={amount} />

                {i === arr.length - 1 ? null : (
                  <hr className="border-muted-6" />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>

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

      <Button
        color="primary"
        variant="solid"
        className="col-start-2 mt-2 w-full rounded-full max-lg:hidden"
        onPress={() => {
          onDialogClose();
          emptyCart();
        }}
      >
        {dictionary.newOrderButton}
      </Button>

      <Button
        color="primary"
        variant="solid"
        className="col-start-2 mt-2 w-full rounded-full lg:hidden"
        onPress={() => {
          onDrawerClose();
          emptyCart();
        }}
      >
        {dictionary.newOrderButton}
      </Button>
    </aside>
  );
};

OrderConfirmed.displayName = displayName;
