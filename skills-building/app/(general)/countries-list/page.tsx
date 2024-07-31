import { SearchFields } from './__components/search-fields';
import { Countries } from './__components/countries';
import React from 'react';

export default async function Home() {
  const res = await fetch(
    'https://restcountries.com/v3.1/alpha?codes=CH,DK,NO,IS,FI,NL,CA,AU&fields=cca2,name,population,region,capital',
  );

  const data = await res.json();

  return (
    <div className="px-5 pb-5 pt-32">
      <React.Suspense>
        <search
          id="search"
          className="grid grid-cols-1 gap-2 md:grid-cols-[2fr_1fr]"
        >
          <SearchFields />
        </search>
      </React.Suspense>

      <React.Suspense>
        <Countries data={data} />
      </React.Suspense>
    </div>
  );
}
