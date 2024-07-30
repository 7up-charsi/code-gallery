'use client';

import { useSearchParams } from 'next/navigation';
import { Country } from '../__types/country';
import { CountryFlag } from './country-flag';
import { Loader2 } from 'lucide-react';
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
    <>
      {error && (
        <main className="mt-10 flex flex-col items-center justify-center gap-3">
          <h1 className="text-2xl font-semibold uppercase">
            something went wrong
          </h1>

          <span className="text-lg text-muted-11/80">
            try another time
          </span>
        </main>
      )}

      {isLoading && (
        <main className="mt-10">
          <Loader2
            size={35}
            className="mx-auto animate-spin text-muted-11"
          />
        </main>
      )}

      {!isLoading && !Array.isArray(data) && (name || region) && (
        <main className="mt-10 flex flex-col items-center justify-center gap-3">
          <h1 className="text-2xl font-semibold uppercase">
            No country found
          </h1>

          <span className="text-lg text-muted-11/80">
            Search valid country name
          </span>
        </main>
      )}

      {Array.isArray(data) && (
        <main className="mt-5 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((country) => (
            <article
              key={country.cca2}
              aria-labelledby={country.cca2}
              className="w-full overflow-hidden rounded bg-background"
            >
              <Link href={`/${country.cca2}`}>
                <CountryFlag cca2={country.cca2} />
              </Link>

              <div className="p-5">
                <h2
                  id={country.cca2}
                  className="mb-3 text-xl font-semibold capitalize"
                >
                  {country.name.common}
                </h2>

                <dl className="">
                  <div className="flex gap-3">
                    <dt className="font-semibold">Population</dt>
                    <dd className="">{country.population}</dd>
                  </div>

                  <div className="flex gap-3">
                    <dt className="font-semibold">region</dt>
                    <dd className="">{country.region}</dd>
                  </div>

                  <div className="flex gap-3">
                    <dt className="font-semibold">capital</dt>
                    <dd className="">{country.capital}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </main>
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
    </>
  );
};

Countries.displayName = displayName;
