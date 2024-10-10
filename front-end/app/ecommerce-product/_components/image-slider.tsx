'use client';

import { PointerEvents } from '@typeweave/react/pointer-events';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import React from 'react';

const displayName = 'ImageSlider';

const urls = [
  '/assets/ecommerce-product/image-product-1.jpg',
  '/assets/ecommerce-product/image-product-2.jpg',
  '/assets/ecommerce-product/image-product-3.jpg',
  '/assets/ecommerce-product/image-product-4.jpg',
];

export const ImageSlider = () => {
  const [emblaRef] = useEmblaCarousel({
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <div className="select-none">
      <Image
        src={urls[selectedIndex]}
        alt="product image"
        width={325}
        height={325}
        priority
        className="w-full rounded"
      />

      <div ref={emblaRef} className="mt-5 overflow-hidden">
        <div className="flex h-[100px] gap-3">
          {urls.map((src, i) => (
            <PointerEvents
              key={i}
              onPress={() => {
                setSelectedIndex(i);
              }}
            >
              <div
                data-selected={i === selectedIndex}
                className="data-[selected=true]:border-muted-8 group flex aspect-square h-full shrink-0 grow-0 cursor-pointer items-center justify-center rounded border-2 border-transparent data-[selected=true]:p-2"
              >
                <Image
                  src={src}
                  alt="product image"
                  className="grow rounded"
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
