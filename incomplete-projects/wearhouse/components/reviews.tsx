'use client';

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';
import { Button } from '@typeweave/react/button';
import { Review } from '@/types/review';
import React from 'react';

interface ReviewsProps {
  reviews: Review[];
}

const displayName = 'Reviews';

export const Reviews = (props: ReviewsProps) => {
  const { reviews } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel();

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
    <section className="mt-10 px-5">
      <div className="flex items-center gap-3">
        <h2 className="font-integral text-3xl font-bold text-black">
          OUR HAPPY CUSTOMERS
        </h2>

        <div className="grow"></div>

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

      <div ref={emblaRef} className="mt-5 overflow-hidden">
        <div className="flex gap-5">
          {reviews.map((ele) => (
            <article
              key={ele.id}
              className="w-full shrink-0 rounded-xl border border-muted-6 p-4"
            >
              {/* TODO: add rating */}
              <h4 className="font-bold text-black">
                {ele.user.fullName}
              </h4>
              <p className="mt-2 text-sm">&quot;{ele.body}&quot;</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

Reviews.displayName = displayName;
