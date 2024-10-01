'use client';

import { useDictionaryCtx } from '../../_components/dictionary-provider';
import { ProductItem } from '../../_components/product-item';

const HomePage = () => {
  const dictionary = useDictionaryCtx('Home page');

  return (
    <main className="bg-muted-2 min-h-[calc(100vh-64px)] p-5">
      <h1 className="sr-only">{dictionary.title}</h1>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-5 gap-y-7">
        {dictionary.data.map((item) => (
          <ProductItem key={item.id} {...item} />
        ))}
      </div>
    </main>
  );
};

export default HomePage;
