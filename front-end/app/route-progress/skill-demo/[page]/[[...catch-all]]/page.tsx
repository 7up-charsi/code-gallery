import { siteConfig } from '../../../site.config';
import { Button } from '@typeweave/react/button';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center pt-20">
      <span className="text-balance text-center text-xl">
        All pages are for demo purpose.
      </span>

      <Button
        asChild
        color="primary"
        variant="solid"
        className="mt-5 capitalize"
        startContent={<ArrowLeftIcon />}
      >
        <Link href={`${siteConfig.pathname}/skill-demo`}>
          go back
        </Link>
      </Button>
    </div>
  );
}
