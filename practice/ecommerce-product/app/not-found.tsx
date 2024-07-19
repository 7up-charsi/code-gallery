import { Button } from '@typeweave/react/button';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center pt-20">
      <span className="text-xl">All pages are for demo purpose.</span>

      <Button
        asChild
        color="primary"
        variant="solid"
        className="mt-5 capitalize"
        startContent={<ArrowLeftIcon />}
      >
        <Link href="/">go back</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
