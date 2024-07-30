import { SearchBar } from './__components/search-bar';
import { Countries } from './__components/countries';
import React from 'react';

export default async function Home() {
  const res = await fetch(
    'https://restcountries.com/v3.1/alpha?codes=CH,DK,NO,IS,FI,NL,CA,AU&fields=cca2,name,population,region,capital',
  );

  const data = await res.json();

  return (
    <div className="px-5 py-5">
      <React.Suspense>
        <SearchBar />
      </React.Suspense>

      <React.Suspense>
        <Countries data={data} />
      </React.Suspense>
    </div>
  );
}
