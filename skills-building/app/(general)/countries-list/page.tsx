import { Countries } from './__components/countries';
import React from 'react';

export default async function Home() {
  const res = await fetch(
    'https://restcountries.com/v3.1/alpha?codes=CH,DK,NO,IS,FI,NL,CA,AU&fields=cca2,name,population,region,capital',
  );

  const data = await res.json();

  return (
    <React.Suspense>
      <Countries data={data} />
    </React.Suspense>
  );
}
