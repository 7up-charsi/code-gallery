import { Button } from '@typeweave/react/button';
import { Input } from '@typeweave/react/input';
import { MailIcon } from 'lucide-react';
import React from 'react';

interface NewsLetterProps {}

const displayName = 'NewsLetter';

export const NewsLetter = (props: NewsLetterProps) => {
  const {} = props;

  return (
    <section className="mt-10 px-5">
      <div className="rounded-xl bg-black p-5">
        <h2 className="text-balance font-integral text-3xl font-bold uppercase text-white">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h2>

        <Input
          label="email"
          hideLabel
          startContent={<MailIcon />}
          placeholder="Enter your email"
          className="mt-5 w-full"
          classNames={{ inputWrapper: 'rounded-full bg-white' }}
        />

        <Button className="mt-3 w-full rounded-full font-medium text-black">
          Subscribe to Newsletter
        </Button>
      </div>
    </section>
  );
};

NewsLetter.displayName = displayName;
