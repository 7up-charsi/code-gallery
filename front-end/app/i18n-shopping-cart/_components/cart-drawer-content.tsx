import { DrawerClose, DrawerContent } from '@typeweave/react/drawer';
import { useDictionaryCtx } from './dictionary-provider';
import { Button } from '@typeweave/react/button';
import { FrownIcon, XIcon } from 'lucide-react';
import { useCart } from '../_hooks/cart';
import { CartItem } from './cart-item';
import React from 'react';

interface CartDrawerContentProps {}

const displayName = 'CartDrawerContent';

export const CartDrawerContent = (props: CartDrawerContentProps) => {
  const {} = props;

  const titleId = React.useId();
  const descId = React.useId();

  const { data, ...dictionary } = useDictionaryCtx(displayName);

  const items = useCart((s) => s.items);

  const itemsInCart = items.reduce(
    (acc, item) => ((acc += item.amount), acc),
    0,
  );

  const total = items.reduce((acc, { id, amount }) => {
    const item = data.find((ele) => ele.id === id)!;

    return (acc += item.price * amount), acc;
  }, 0);

  return (
    <DrawerContent
      aria-labelledby={titleId}
      aria-describedby={descId}
      placement="right"
      className="flex flex-col overflow-hidden py-5"
    >
      <div className="flex items-center justify-between px-5">
        <span
          id={titleId}
          className="text-muted-12 whitespace-nowrap text-lg font-normal capitalize"
        >
          Cart{' '}
          {!itemsInCart ? null : (
            <span className="text-muted-12 font-medium">
              ( {itemsInCart} )
            </span>
          )}
        </span>

        <DrawerClose>
          <Button
            isIconOnly
            aria-label="close cart drawer"
            variant="text"
            color="danger"
          >
            <XIcon />
          </Button>
        </DrawerClose>
      </div>

      {itemsInCart ? null : (
        <div className="mt-10 flex flex-col items-center justify-center gap-5">
          <FrownIcon size={70} className="text-foreground/50" />

          <span className="first-letter:uppercase">
            {dictionary.emptyCart}
          </span>
        </div>
      )}

      {!items.length ? null : (
        <>
          <div className="scrollbar-thin mt-5 space-y-4 overflow-auto pl-5 pr-3">
            {items.map(({ id, amount }) => {
              const item = data.find((ele) => ele.id === id)!;

              return (
                <CartItem key={item.id} {...item} amount={amount} />
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between gap-5 px-5">
            <span className="text-lg font-medium capitalize">
              {dictionary.total}
            </span>

            <span
              className="text-muted-12 text-xl font-medium"
              aria-label={`Total amount is $${total}`}
            >
              $ {total}
            </span>
          </div>

          <DrawerClose>
            <Button
              variant="solid"
              className="mx-5 mt-5"
              // TODO: open thanks dialog
            >
              {dictionary.confirmOrderButton}
            </Button>
          </DrawerClose>
        </>
      )}
    </DrawerContent>
  );
};

CartDrawerContent.displayName = displayName;
