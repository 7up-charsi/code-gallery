import { Button } from '@typeweave/react/button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="">
      <section className="p-5">
        <div className="grid grid-cols-2 grid-rows-[350px_150px] gap-5 md:grid-cols-[1fr_250px] md:grid-rows-[repeat(2,200px)] lg:grid-cols-[1fr_300px] lg:grid-rows-[repeat(2,250px)] xl:grid-cols-[1fr_400px] xl:grid-rows-[repeat(2,300px)]">
          <article
            aria-labelledby="bannar-big-label"
            aria-describedby="bannar-big-desc"
            className="relative col-span-2 overflow-hidden rounded bg-[url(/assets/bannar-big.jpg)] bg-cover bg-right text-white md:col-span-1 md:row-span-2 lg:bg-right-top"
          >
            <div className="absolute flex h-full w-full flex-col items-center justify-center bg-black/30 px-2 backdrop-blur-sm lg:top-1/2 lg:h-auto lg:-translate-y-1/2 lg:items-start lg:bg-transparent lg:pl-10 lg:backdrop-blur-none">
              <h2
                id="bannar-big-label"
                className="text-center text-4xl font-semibold capitalize md:text-4xl lg:text-left xl:text-5xl"
              >
                Fresh & Healthy
                <br />
                Organic Food
              </h2>

              <div
                id="bannar-big-desc"
                className="mt-8 flex flex-col items-center gap-2 pl-2 lg:items-start lg:border-l-2 lg:border-primary-6"
              >
                <span className="">
                  Sale up to{' '}
                  <span className="ml-1 rounded bg-warning-9 px-3 py-1">
                    30% OFF
                  </span>
                </span>

                <span className="mt-2 rounded p-1 text-sm font-light">
                  Free shipping on all your order.
                </span>
              </div>

              <Button
                color="primary"
                endContent={<ArrowRightIcon />}
                asChild
                className="mt-8 rounded-full"
              >
                <Link href="/">Shop Now</Link>
              </Button>
            </div>
          </article>

          <article
            aria-labelledby="bannar-1-label"
            aria-describedby="bannar-1-desc"
            className="relative overflow-hidden rounded bg-[url(/assets/bannar-1.jpg)] bg-cover bg-right"
          >
            {/* <div className="absolute left-5 top-1/2 -translate-y-1/2"> */}
            <div className="absolute flex h-full w-full flex-col items-center justify-center bg-white/30 p-4 backdrop-blur-sm lg:h-auto lg:w-auto lg:items-start lg:bg-transparent lg:backdrop-blur-none">
              <h2
                id="bannar-1-label"
                className="text-center text-xs font-medium uppercase text-muted-12 lg:text-left"
              >
                Summer Sale
                <br />
                <span className="mt-1 inline-block text-2xl font-semibold">
                  75% OFF
                </span>
              </h2>

              <div
                id="bannar-1-desc"
                className="mt-2 text-xs text-muted-12"
              >
                Only Fruit & Vegetable
              </div>

              <button className="mt-3 flex rounded-full font-medium text-primary-11 outline-none ring-focus transition-all hover:text-muted-12 focus-visible:ring-2 active:text-muted-12 md:mt-8 lg:mt-3">
                <Link href="/">
                  <span>Shop Now</span>{' '}
                  <ArrowRightIcon
                    size={20}
                    className="inline-block"
                  />
                </Link>
              </button>
            </div>
          </article>

          <article
            aria-labelledby="bannar-2-label"
            aria-describedby="bannar-2-desc"
            className="relative overflow-hidden rounded bg-[url(/assets/bannar-2.jpg)] bg-cover bg-right"
          >
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-white">
              <h2
                id="bannar-2-label"
                className="text-sm font-medium uppercase"
              >
                best deal
              </h2>

              <div
                id="bannar-2-desc"
                className="mt-2 whitespace-nowrap text-center text-lg font-semibold capitalize lg:text-2xl"
              >
                Special Products <br /> Deal of the Month
              </div>

              <Button
                asChild
                endContent={<ArrowRightIcon />}
                color="primary"
                className="mt-3 rounded-full md:mt-8"
              >
                <Link href="/">Shop Now</Link>
              </Button>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

