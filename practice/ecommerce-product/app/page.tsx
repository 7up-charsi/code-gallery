'use client';

import { MinusIcon, PlusIcon, ShoppingCart } from 'lucide-react';
import { PointerEvents } from '@typeweave/react/pointer-events';
import { ImageSlider } from '@/components/image-slider';
import { Button } from '@typeweave/react/button';
import { useCart } from '@/zustand/cart';

export default function Home() {
  const { amount, decrease, increase } = useCart();

  return (
    <main className="flex justify-center">
      <article className="grid max-w-screen-lg grid-cols-1 md:grid-cols-[auto_1fr] md:items-center md:gap-5 md:p-5 lg:mt-16 lg:gap-10 lg:px-16">
        <ImageSlider />

        <div className="p-5">
          <span className="text-sm font-semibold uppercase">
            sneaker company
          </span>

          <h1 className="mt-1 text-2xl font-semibold capitalize text-muted-12">
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
              <dd className="text-2xl font-semibold text-muted-12">
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

          <div className="mt-5 flex flex-col gap-3 md:flex-row">
            <div className="flex h-12 items-center rounded bg-muted-3">
              <PointerEvents onPress={decrease}>
                <button
                  aria-label="remove 1 from cart"
                  className="flex h-full w-10 cursor-pointer items-center justify-center rounded-l text-primary-11 outline-none ring-focus hover:bg-primary-4 focus-visible:ring-2 active:bg-primary-5"
                >
                  <MinusIcon size={20} />
                </button>
              </PointerEvents>

              <span className="min-w-16 grow px-1 text-center font-bold text-muted-12">
                {amount}
              </span>

              <PointerEvents onPress={increase}>
                <button
                  aria-label="add 1 in cart"
                  className="flex h-full w-10 cursor-pointer items-center justify-center rounded-r text-primary-11 outline-none ring-focus hover:bg-primary-4 focus-visible:ring-2 active:bg-primary-5"
                >
                  <PlusIcon size={20} />
                </button>
              </PointerEvents>
            </div>

            <Button
              variant="solid"
              color="primary"
              className="h-12 rounded max-md:w-full md:grow"
              startContent={<ShoppingCart />}
            >
              add to cart
            </Button>
          </div>
        </div>
      </article>
    </main>
  );
}
