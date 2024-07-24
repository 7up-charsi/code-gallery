'use client';

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Product as ProductType } from '@/types/product';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';
import { Button } from '@typeweave/react/button';
import { Product } from './product';
import React from 'react';

interface ProductsSliderProps {
  products: ProductType[];
}

const displayName = 'ProductsSlider';

export const ProductsSlider = (props: ProductsSliderProps) => {
  const { products } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });
  const [canNext, setCanNext] = React.useState(true);
  const [canPrev, setCanPrev] = React.useState(true);

  React.useEffect(() => {
    if (!emblaApi) return;

    const handler = (api: EmblaCarouselType) => {
      setCanNext(api.canScrollNext());
      setCanPrev(api.canScrollPrev());
    };

    handler(emblaApi);
    emblaApi.on('init', handler).on('select', handler);

    return () => {
      emblaApi.off('init', handler).off('select', handler);
    };
  }, [emblaApi]);

  return (
    <div className="mt-5">
      <div className="flex justify-end gap-2">
        <Button
          isIconOnly
          aria-label="slide previous"
          disabled={!canPrev}
          onPress={() => {
            if (emblaApi) emblaApi.scrollPrev();
          }}
          className="rounded-full"
        >
          <ArrowLeftIcon />
        </Button>

        <Button
          isIconOnly
          aria-label="slide next"
          disabled={!canNext}
          onPress={() => {
            if (emblaApi) emblaApi.scrollNext();
          }}
          className="rounded-full"
        >
          <ArrowRightIcon />
        </Button>
      </div>

      <div ref={emblaRef} className="mt-2 overflow-hidden">
        <div className="flex gap-5">
          {products.map((ele) => (
            <Product key={ele.id} {...ele} />
          ))}
        </div>
      </div>
    </div>
  );
};

ProductsSlider.displayName = displayName;
