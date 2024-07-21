import { Button } from '@typeweave/react/button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="">
      <section className="p-5">
        <div className="grid grid-cols-1 grid-rows-[350px_repeat(2,150px)] gap-5">
          <article
            aria-labelledby="bannar-big-label"
            aria-describedby="bannar-big-desc"
            className="relative overflow-hidden rounded bg-[url(/assets/bannar-big.jpg)] bg-cover bg-right text-white"
          >
            <div className="absolute left-5 top-1/2 -translate-y-1/2">
              <h2
                id="bannar-big-label"
                className="text-2xl font-semibold capitalize"
              >
                Fresh & Healthy
                <br />
                Organic Food
              </h2>

              <div
                id="bannar-big-desc"
                className="mt-5 flex flex-col gap-2 border-l-2 border-primary-6 pl-2"
              >
                <span className="text-sm">
                  Sale up to{' '}
                  <span className="ml-1 rounded bg-warning-9 px-3 py-1">
                    30% OFF
                  </span>
                </span>

                <span className="mt-2 rounded bg-primary-1/20 p-1 text-xs font-light backdrop-blur-sm">
                  Free shipping on all your order.
                </span>
              </div>

              <Button
                color="primary"
                endContent={<ArrowRightIcon />}
                asChild
                className="mt-5 rounded-full"
              >
                <Link href="/">Shop Now</Link>
              </Button>
            </div>
          </article>

          <article
            aria-labelledby="bannar-1-label"
            aria-describedby="bannar-1-desc"
            className="relative rounded bg-[url(/assets/bannar-1.jpg)] bg-cover bg-right"
          >
            <div className="absolute left-5 top-1/2 -translate-y-1/2">
              <h2
                id="bannar-1-label"
                className="text-sm font-medium uppercase text-muted-12"
              >
                Summer Sale
                <br />
                <span className="mt-1 inline-block text-2xl">
                  75% OFF
                </span>
              </h2>

              <div id="bannar-1-desc" className="mt-2 text-sm">
                Only Fruit & Vegetable
              </div>

              <Button
                asChild
                endContent={<ArrowRightIcon />}
                color="primary"
                className="mt-2 rounded-full bg-primary-3/50 backdrop-blur-sm hover:bg-primary-4/50 active:bg-primary-5/50"
              >
                <Link href="/">Shop Now</Link>
              </Button>
            </div>
          </article>

          <article
            aria-labelledby="bannar-2-label"
            aria-describedby="bannar-2-desc"
            className="relative rounded bg-[url(/assets/bannar-2.jpg)] bg-cover bg-right"
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
                className="mt-2 whitespace-nowrap text-center text-2xl font-semibold capitalize"
              >
                Special Products <br /> Deal of the Month
              </div>

              <Button
                asChild
                endContent={<ArrowRightIcon />}
                color="primary"
                className="mt-2 rounded-full bg-primary-3/20 text-white backdrop-blur-sm hover:bg-primary-4/20 active:bg-primary-5/20"
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

