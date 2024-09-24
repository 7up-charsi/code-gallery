'use client';

import { MinusIcon, PlusIcon, ShoppingCart } from 'lucide-react';
import { PointerEvents } from '@typeweave/react/pointer-events';
import { ImageSlider } from './_components/image-slider';
import { Button } from '@typeweave/react/button';
import { useCart } from './_hooks/cart';
import { toast } from 'react-toastify';

export default function Home() {
  const { updateInputValue, inputValue, amount, updateCart } =
    useCart();

  return (
    <main className="p-5 md:px-8">
      <article className="mx-auto grid max-w-screen-md grid-cols-1 gap-5 md:grid-cols-[1fr_1.3fr]">
        <ImageSlider />

        <div className="">
          <span className="text-sm font-semibold uppercase">
            sneaker company
          </span>

          <h1 className="text-muted-12 mt-1 text-2xl font-semibold capitalize">
            fall limited edition sneakers
          </h1>

          <p className="mt-4 text-sm">
            These low-profile sneakers are your perfect casual wear
            companion. Featuring a durable rubber outer sale,
            ther&apos;ll withstand everything the weather can offer.
          </p>

          <dl className="mt-5 flex max-md:items-center md:flex-col">
            <div className="flex items-center gap-3">
              <dt className="sr-only">price</dt>
              <dd className="text-muted-12 text-2xl font-semibold">
                $125.00
              </dd>

              <dt className="sr-only">off percentage</dt>
              <dd className="rounded-lg bg-black px-2 py-px text-sm text-white">
                50%
              </dd>
            </div>

            <div className="grow"></div>

            <dt className="sr-only">total price was</dt>
            <dd className="font-semibold md:mt-3">
              <del>$250.00</del>
            </dd>
          </dl>

          <div className="mt-5 flex h-10 items-center gap-5">
            <div className="bg-muted-3 flex h-full grow items-center rounded">
              <PointerEvents onPress={() => updateInputValue('dec')}>
                <button
                  aria-label="remove 1 from cart"
                  disabled={inputValue === 1}
                  className="text-primary-11 ring-focus hover:bg-primary-4 active:bg-primary-5 disabled:disabled flex h-full w-10 cursor-pointer items-center justify-center rounded-l outline-none focus-visible:ring-2"
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
                  className="text-primary-11 ring-focus hover:bg-primary-4 active:bg-primary-5 disabled:disabled flex h-full w-10 cursor-pointer items-center justify-center rounded-r outline-none focus-visible:ring-2"
                >
                  <PlusIcon size={20} />
                </button>
              </PointerEvents>
            </div>

            <Button
              variant="solid"
              color="primary"
              className="h-full grow rounded"
              startContent={<ShoppingCart />}
              onPress={() => {
                updateCart();

                if (amount === inputValue) return;

                if (amount) {
                  toast.success('cart updated');
                } else {
                  toast.success('added into cart');
                }
              }}
            >
              {amount ? 'update cart' : 'add to cart'}
            </Button>
          </div>
        </div>
      </article>
    </main>
  );
}
