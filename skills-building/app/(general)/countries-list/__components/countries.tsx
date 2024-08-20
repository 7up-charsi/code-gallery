'use client';

import { useSearchParams } from 'next/navigation';
import { Country } from '../__types/country';
import { siteConfig } from '../site.config';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';

interface CountriesProps {
  data: Country[];
}

const displayName = 'Countries';

export const Countries = (props: CountriesProps) => {
  const { data: serverData } = props;

  const searchParams = useSearchParams();

  const name = searchParams.get('name');
  const region = searchParams.get('region');

  const {
    data: searchedData,
    error,
    isLoading,
  } = useSWR<
    { message: string } | Country[] | null,
    Error,
    string | null
  >(
    (((name && region) || name) &&
      `https://restcountries.com/v3.1/name/${name}`) ||
      (region && `https://restcountries.com/v3.1/region/${region}`) ||
      null,
    (url) => (url ? fetch(url).then((r) => r.json()) : null),
  );

  const data = name || region ? searchedData : serverData;

  return (
    <main className="px-5 py-5 md:px-8">
      {error && (
        <section className="flex flex-col items-center justify-center gap-3">
          <h1
            aria-describedby="error-desc"
            className="text-danger-11 text-xl font-semibold capitalize"
          >
            something went wrong
          </h1>

          <span
            id="error-desc"
            className="text-muted-11/80 text-lg capitalize"
          >
            try another time
          </span>
        </section>
      )}

      {isLoading && (
        <section className="">
          <Loader2
            size={35}
            className="text-muted-11 mx-auto animate-spin"
          />
        </section>
      )}

      {!isLoading && !Array.isArray(data) && (name || region) && (
        <section className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-2xl font-semibold uppercase">
            No country found
          </h1>

          <span className="text-muted-11/80 text-lg">
            Search valid country name
          </span>
        </section>
      )}

      {Array.isArray(data) && (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((country) => (
            <Link
              key={country.cca2}
              href={`${siteConfig.pathname}/${country.cca2}`}
            >
              <article
                aria-labelledby={country.cca2}
                className="relative isolate flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded text-white"
              >
                <div className="absolute inset-0 -z-20 aspect-video w-full">
                  <Image
                    src={`https://flagcdn.com/w1280/${country.cca2.toLowerCase()}.png`}
                    alt={country.cca2}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute inset-0 -z-10 bg-black/70 backdrop-blur-sm" />

                <h2
                  id={country.cca2}
                  className="mb-3 text-2xl font-semibold capitalize"
                >
                  {country.name.common}
                </h2>

                <dl className="grid grid-cols-2 gap-x-5 gap-y-2">
                  <dt className="text-end font-semibold capitalize">
                    Population
                  </dt>
                  <dd className="">{country.population}</dd>

                  <dt className="text-end font-semibold capitalize">
                    region
                  </dt>
                  <dd className="">{country.region}</dd>

                  <dt className="text-end font-semibold capitalize">
                    capital
                  </dt>
                  <dd className="">{country.capital}</dd>
                </dl>
              </article>
            </Link>
          ))}
        </section>
      )}

      <div
        role="status"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        aria-relevant="all"
      >
        {error ? 'something went wrong' : null}
      </div>

      <div
        role="status"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        aria-relevant="all"
      >
        {(name || region) && isLoading ? 'searching' : null}
      </div>

      <div
        role="status"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        aria-relevant="all"
      >
        {(name || region) && !isLoading && Array.isArray(data)
          ? 'search has been completed'
          : null}
      </div>

      <div
        role="status"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        aria-relevant="all"
      >
        {(name || region) && !isLoading && !Array.isArray(data)
          ? 'no country found. search valid country name'
          : null}
      </div>
    </main>
  );
};

Countries.displayName = displayName;
