'use client';

import { PointerEvents } from '@typeweave/react/pointer-events';
import { useIsMounted } from '@typeweave/react/use-is-mounted';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';
import { Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface ImageSliderProps {}

const displayName = 'ImageSlider';

const urls = [
  '/assets/ecommerce-product/image-product-1.jpg',
  '/assets/ecommerce-product/image-product-2.jpg',
  '/assets/ecommerce-product/image-product-3.jpg',
  '/assets/ecommerce-product/image-product-4.jpg',
];

export const ImageSlider = (props: ImageSliderProps) => {
  const {} = props;

  const isMounted = useIsMounted();

  const [emblaRef] = useEmblaCarousel({
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <div className="select-none">
      <div className="relative isolate h-[300px] w-full overflow-hidden rounded md:aspect-square md:h-auto">
        {!isMounted && (
          <div className="flex h-full w-full items-center justify-center">
            <Loader2Icon size={40} className="animate-spin" />
          </div>
        )}

        {isMounted && (
          <>
            <Image
              src={urls[selectedIndex]}
              alt="product image"
              fill
              className="object-contain object-center"
            />

            <div className="absolute inset-0 -z-10 bg-white/20 backdrop-blur-lg"></div>

            <Image
              src={urls[selectedIndex]}
              alt="product image"
              fill
              className="-z-20 object-cover object-center"
            />
          </>
        )}
      </div>

      <div ref={emblaRef} className="mt-5 overflow-hidden">
        <div className="flex gap-3">
          {urls.map((src, i) => (
            <PointerEvents
              key={i}
              onPress={() => {
                setSelectedIndex(i);
              }}
            >
              <div
                data-selected={i === selectedIndex}
                className="w-22 data-[selected=true]:border-primary-8 group flex aspect-square shrink-0 grow-0 cursor-pointer items-center justify-center rounded border-2 border-transparent"
              >
                <Image
                  src={src}
                  alt="product image"
                  className="h-full w-full rounded group-data-[selected=true]:h-[calc(100%-10px)] group-data-[selected=true]:w-[calc(100%-10px)]"
                  height={80}
                  width={80}
                />
              </div>
            </PointerEvents>
          ))}
        </div>
      </div>
    </div>
  );
};

ImageSlider.displayName = displayName;
