import { Button } from '@typeweave/react/button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface SkillLandingCardProps {
  name: string;
  description: string;
  pathname: string;
}

const displayName = 'SkillLandingCard';

export const SkillLandingCard = (props: SkillLandingCardProps) => {
  const { description, name, pathname } = props;

  return (
    <article className="bg-background w-full max-w-screen-sm rounded p-5 shadow-md">
      <h1 className="truncate text-balance text-center text-2xl font-medium capitalize">
        {name}
      </h1>

      <p className="mt-5 text-balance text-center first-letter:uppercase">
        {description}
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        <p>Ready to see my skill in action?</p>

        <Button endContent={<ArrowRightIcon />} asChild>
          <Link href={`${pathname.replace(/\/+$/, '')}/skill-demo`}>
            View Demo
          </Link>
        </Button>
      </div>

      <hr className="border-muted-6 my-4" />

      <div className="text-foreground/100 text-balance text-center text-sm first-letter:uppercase">
        Developed to demonstrate my expertise in web front-end
        development
      </div>
    </article>
  );
};

SkillLandingCard.displayName = displayName;
