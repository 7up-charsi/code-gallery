import { AppBarContent } from './app-bar-content';
import { Button } from '@typeweave/react/button';
import { ArrowRightIcon } from 'lucide-react';
import { portfolio } from '@repo/meta';
import { AppBar } from './app-bar';
import Link from 'next/link';
import React from 'react';

interface SkillLandingPageContentProps {
  name: string;
  description: string;
  pathname: string;
}

const displayName = 'SkillLandingPageContent';

export const SkillLandingPageContent = (
  props: SkillLandingPageContentProps,
) => {
  const { description, name, pathname } = props;

  return (
    <>
      <AppBar>
        <AppBarContent />
      </AppBar>

      <main className="bg-muted-1 min-h-[calc(100vh-64px)] content-center p-5">
        <article className="bg-background mx-auto w-full max-w-screen-sm rounded p-5">
          <h1 className="truncate text-balance text-center text-2xl font-medium capitalize">
            {name}
          </h1>

          <p className="mt-5 text-balance text-center first-letter:uppercase">
            {description}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <p className="text-balance text-center">
              Ready to see my skill in action?
            </p>

            <Button endContent={<ArrowRightIcon />} asChild>
              <Link
                href={`${pathname.replace(/\/+$/, '')}/skill-demo`}
              >
                View Demo
              </Link>
            </Button>
          </div>

          <p className="mt-10 text-balance text-center">
            To view my all skills, please visit my{' '}
            <Link
              href={portfolio.url}
              target="_blank"
              rel="noopner noreferrer"
              className="text-muted-12 uppercase underline transition-colors hover:underline-offset-4"
            >
              portfolio
            </Link>
          </p>

          <hr className="border-muted-6 mt-5" />

          <div className="text-foreground/100 mt-5 text-balance text-center text-sm first-letter:uppercase">
            Developed to demonstrate my expertise in web front-end
            development
          </div>
        </article>
      </main>
    </>
  );
};

SkillLandingPageContent.displayName = displayName;
