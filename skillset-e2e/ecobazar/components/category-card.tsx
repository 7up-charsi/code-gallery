import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CategoryCardProps {
  name: string;
  image: string;
  id: string;
}

const displayName = 'CategoryCard';

export const CategoryCard = (props: CategoryCardProps) => {
  const { id, image, name } = props;

  return (
    <Link
      href="/"
      className="rounded border border-muted-6 pb-2 outline-none ring-primary-8 hover:shadow-[0px_0px_5px] focus-visible:ring-2 active:border-primary-8 active:shadow-[0px_0px_8px] [&:is(:hover,:active)]:border-primary-7 [&:is(:hover,:active)]:shadow-primary-9/50"
    >
      <article
        aria-labelledby={id}
        className="grid h-full w-full grid-cols-1 grid-rows-[1fr_auto] gap-2"
      >
        <div className="relative m-5">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain"
          />
        </div>

        <div id={id} className="truncate text-center capitalize">
          {name}
        </div>
      </article>
    </Link>
  );
};

CategoryCard.displayName = displayName;
