'use client';

import { useDictionaryCtx } from '../../_components/dictionary-provider';
import { ProductItem } from '../../_components/product-item';

const HomePage = () => {
  const dictionary = useDictionaryCtx('Home page');

  return (
    <main className="">
      <h1 className="sr-only">{dictionary.title}</h1>

      <div className="mt-5 grid grid-cols-1 gap-5 gap-y-7 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {dictionary.data.map((item) => (
          <ProductItem key={item.id} {...item} />
        ))}
      </div>
    </main>
  );
};

export default HomePage;
