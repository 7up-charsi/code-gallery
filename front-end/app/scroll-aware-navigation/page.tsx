import { Button } from '@typeweave/react/button';
import { ArrowRightIcon } from 'lucide-react';
import { siteConfig } from './site.config';
import Link from 'next/link';

export default function SkillLandingPage() {
  return (
    <main className="bg-muted-1 flex min-h-screen items-center justify-center p-5 md:px-8">
      <article className="bg-background w-full max-w-screen-sm rounded p-5">
        <h1 className="truncate text-balance text-center text-2xl font-medium capitalize">
          {siteConfig.name}
        </h1>

        <p className="mt-5 text-balance text-center first-letter:uppercase">
          {siteConfig.description}
        </p>

        <div className="flex items-center justify-center">
          <Button
            variant="text"
            endContent={<ArrowRightIcon />}
            asChild
            className="mt-5 flex"
          >
            <Link href={`${siteConfig.pathname}/skill-demo`}>
              View Demo
            </Link>
          </Button>
        </div>
      </article>
    </main>
  );
}
