import { CountryFlag } from '../__components/country-flag';
import { Button } from '@typeweave/react/button';
import { Country } from '../__types/country';
import { ArrowLeftIcon } from 'lucide-react';
import { siteConfig } from '../site.config';
import Link from 'next/link';

const CountryPage = async (props: { params: { cca2: string } }) => {
  const {
    params: { cca2 },
  } = props;

  const res = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${cca2}&fields=cca2,name,population,region,subregion,capital,tld,currencies,languages,borders`,
  );
  const data = (await res.json()) as Country[];

  const country = data[0];

  if (!country)
    return (
      <main className="h-screen w-screen content-center">
        <div className="mx-auto flex flex-col items-center justify-center gap-5">
          <h1 className="text-4xl font-semibold capitalize leading-none">
            no country found
          </h1>

          <div className="text-lg">Go back and search again</div>

          <Button
            aria-label="go back"
            startContent={<ArrowLeftIcon />}
            asChild
            variant="solid"
          >
            <Link href={siteConfig.pathname}>Back</Link>
          </Button>
        </div>
      </main>
    );

  return (
    <main className="mx-auto max-w-screen-sm p-5 lg:px-10">
      <Button
        aria-label="go back"
        startContent={<ArrowLeftIcon />}
        asChild
      >
        <Link href={siteConfig.pathname}>Back</Link>
      </Button>

      <article
        key={country.cca2}
        aria-labelledby={country.cca2}
        className="mx-auto mt-5 w-full gap-5 overflow-hidden rounded bg-background p-5"
      >
        <div className="mx-auto max-w-md">
          <CountryFlag cca2={country.cca2} />
        </div>

        <h2
          id={country.cca2}
          className="mt-5 text-xl font-semibold capitalize"
        >
          {country.name.common}
        </h2>

        <dl className="mt-5 *:whitespace-nowrap">
          <div className="flex flex-wrap justify-between gap-10">
            <div className="space-y-2">
              {[
                { label: 'population', value: country.population },
                { label: 'region', value: country.region },
                { label: 'subregion', value: country.subregion },
                { label: 'capital', value: country.capital },
              ].map((ele, i) => (
                <div key={i} className="flex items-center gap-3">
                  <dt className="font-semibold capitalize">
                    {ele.label}
                  </dt>
                  <dd className="">{ele.value}</dd>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <dt className="font-semibold capitalize">
                  top level domain
                </dt>
                <dd className="">{country.tld}</dd>
              </div>

              <div className="flex items-center gap-3">
                <dt className="font-semibold capitalize">
                  currencies
                </dt>
                <dd className="">
                  {Object.values(country.currencies)
                    .map((ele) => ele.name)
                    .join(', ')}
                </dd>
              </div>

              <div className="flex items-center gap-3">
                <dt className="font-semibold capitalize">
                  languages
                </dt>
                <dd className="">
                  {Object.values(country.languages).join(', ')}
                </dd>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <dt className="font-semibold capitalize">
              border countries
            </dt>

            <dd className="">
              <ul className="mt-5 flex flex-wrap gap-4">
                {Object.values(country.borders).map((ele, i) => (
                  <li key={i}>
                    <Link
                      href={`${siteConfig.pathname}/${ele}`}
                      className="flex h-9 min-w-20 items-center justify-center rounded bg-muted-4 px-3"
                    >
                      {ele}
                    </Link>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </article>
    </main>
  );
};

export default CountryPage;
