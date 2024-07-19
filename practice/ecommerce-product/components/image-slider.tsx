'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';
import { PointerEvents } from '@typeweave/react';
import Image from 'next/image';
import React from 'react';

interface ImageSliderProps {}

const displayName = 'ImageSlider';

const urls = [
  '/assets/image-product-1.jpg',
  '/assets/image-product-2.jpg',
  '/assets/image-product-3.jpg',
  '/assets/image-product-4.jpg',
];

export const ImageSlider = (props: ImageSliderProps) => {
  const {} = props;

  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbRef, emblaThumbApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!emblaMainApi || !emblaThumbApi) return;

    const handler = (emblaApi: EmblaCarouselType) => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      emblaThumbApi.scrollTo(emblaApi.selectedScrollSnap());
    };

    handler(emblaMainApi);

    emblaMainApi.on('reInit', handler).on('select', handler);
  }, [emblaMainApi, emblaThumbApi]);

  return (
    <div className="md:w-[350px]">
      <div ref={emblaMainRef} className="overflow-hidden">
        <div className="flex touch-pan-y touch-pinch-zoom">
          {urls.map((src, i) => (
            <div
              key={i}
              className="relative aspect-square max-h-[500px] w-full shrink-0 grow-0 overflow-hidden md:aspect-auto md:h-[350px] md:rounded"
            >
              <Image
                src={src}
                alt="product image"
                fill
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 overflow-hidden max-md:hidden">
        <div ref={emblaThumbRef}>
          <div className="flex gap-5">
            {urls.map((src, i) => (
              <PointerEvents
                key={i}
                onPress={() => {
                  if (!emblaMainApi) return;
                  emblaMainApi.scrollTo(i);
                }}
              >
                <div
                  data-selected={i === selectedIndex}
                  className="relative aspect-square w-20 shrink-0 grow-0 overflow-hidden rounded border-2 border-transparent data-[selected=true]:border-primary-8"
                >
                  <Image
                    src={src}
                    alt="product image"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </PointerEvents>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ImageSlider.displayName = displayName;
