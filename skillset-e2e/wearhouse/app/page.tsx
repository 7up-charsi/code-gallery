import heroMobileImage from '@/assets/hero-mobile.jpg';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-muted-3">
      <section className="pt-7">
        <div className="px-5">
          <h1
            aria-describedby="hero-desc"
            className="font-integral text-3xl font-bold text-black"
          >
            FIND CLOTHES <br />
            THAT MATCHES <br />
            YOUR STYLE
          </h1>

          <p id="hero-desc" className="mt-5 text-balance text-sm">
            Browse through our diverse range of meticulously crafted
            garments, designed to bring out your individuality and
            cater to your sense of style.
          </p>

          <Link
            href="/shop"
            className="mt-5 block h-12 w-full content-center rounded-full bg-black text-center text-lg text-white"
          >
            Shop Now
          </Link>

          <dl className="mt-5 grid grid-cols-[repeat(3,auto)] items-center justify-center justify-items-center gap-5 *:whitespace-nowrap">
            <div className="flex flex-col">
              <dt className="text-xs">International Brands</dt>
              <dd className="-order-1 text-2xl font-bold text-black">
                200+
              </dd>
            </div>

            <div className="mx-5 h-10 w-[2px] rounded-full bg-muted-6"></div>

            <div className="flex flex-col">
              <dt className="text-xs">High-Quality Products</dt>
              <dd className="-order-1 text-2xl font-bold text-black">
                2,000+
              </dd>
            </div>

            <div className="col-span-3 flex flex-col">
              <dt className="text-xs">Happy Customers</dt>
              <dd className="-order-1 text-2xl font-bold text-black">
                30,000+
              </dd>
            </div>
          </dl>
        </div>

        <Image
          src={heroMobileImage}
          alt="hero image"
          className="w-full"
        />
      </section>

      <section className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 bg-black px-5 py-8 text-white">
        <Image
          src="/assets/brands/versace.svg"
          alt="versace"
          width={0}
          height={0}
          className="w-auto"
        />
        <Image
          src="/assets/brands/zara.svg"
          alt="zara"
          width={0}
          height={0}
          className="w-auto"
        />
        <Image
          src="/assets/brands/gucci.svg"
          alt="gucci"
          width={0}
          height={0}
          className="w-auto"
        />
        <Image
          src="/assets/brands/prada.svg"
          alt="prada"
          width={0}
          height={0}
          className="w-auto"
        />
        <Image
          src="/assets/brands/calvin-klein.svg"
          alt="calvin-klein"
          width={0}
          height={0}
          className="w-auto"
        />
      </section>
    </main>
  );
}

