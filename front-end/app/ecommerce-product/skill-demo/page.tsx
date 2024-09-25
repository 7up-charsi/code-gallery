import { AddToCartButton } from '../_components/add-to-cart-button';
import { AmountButtons } from '../_components/amount-buttons';
import { ImageSlider } from '../_components/image-slider';

export default function Home() {
  return (
    <main className="p-5 md:px-8">
      <article className="mx-auto grid max-w-md grid-cols-1 gap-5 md:max-w-[calc(theme(screens.md)+100px)] md:grid-cols-[minmax(300px,400px)_minmax(370px,1fr)]">
        <ImageSlider />

        <div className="">
          <span className="text-sm font-semibold uppercase">
            sneaker company
          </span>
          <h1 className="text-muted-12 mt-1 text-2xl font-semibold capitalize">
            fall limited edition sneakers
          </h1>
          <p className="mt-4 max-w-lg text-sm">
            Elevate your casual style with our exclusive fall limited
            edition sneakers, expertly crafted for the ultimate blend
            of comfort, durability, and sophistication. These
            low-profile sneakers are designed to be your perfect
            companion for everyday adventures.
          </p>

          <div className="text-muted-12 mt-3 text-sm font-medium">
            Key Features:
          </div>

          <ul className="list-inside list-disc space-y-1">
            <li>
              <span className="text-muted-12 font-medium">
                Durable Rubber Outsole:
              </span>{' '}
              Withstand the unpredictable fall weather with our rugged
              rubber outsole, providing traction and protection
              against rain, snow, and everything in between.
            </li>
            <li>
              <span className="text-muted-12 font-medium">
                Premium Materials:
              </span>{' '}
              Our carefully selected materials ensure a soft,
              breathable, and lightweight wear, keeping your feet
              comfortable all day long.
            </li>
            <li>
              <span className="text-muted-12 font-medium">
                Timeless Design:
              </span>{' '}
              Clean lines, subtle colorways, and a low-profile
              silhouette make these sneakers versatile enough to pair
              with any outfit, from casual jeans to dress pants.
            </li>
            <li>
              <span className="text-muted-12 font-medium">
                Limited Edition:
              </span>{' '}
              Exclusive to our fall collection, these sneakers are
              available for a limited time only, making them a unique
              addition to your shoe rotation.
            </li>
          </ul>

          <dl className="mt-10 flex flex-wrap items-center justify-center">
            <dt className="sr-only">price</dt>
            <dd className="text-muted-12 text-2xl font-semibold">
              $125.00
            </dd>

            <dt className="sr-only">off percentage</dt>
            <dd className="ml-3 rounded-lg bg-black px-2 py-px text-sm text-white">
              50%
            </dd>

            <dt className="sr-only">total price was</dt>
            <dd className="ml-3 font-semibold">
              <del>$250.00</del>
            </dd>
          </dl>
          <div className="mx-auto mt-5 flex max-w-sm flex-wrap items-center gap-x-5 gap-y-3">
            <AmountButtons />
            <AddToCartButton />
          </div>
        </div>
      </article>
    </main>
  );
}
