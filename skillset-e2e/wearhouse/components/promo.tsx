import Link from 'next/link';
import React from 'react';

interface PromoProps {}

const displayName = 'Promo';

export const Promo = (props: PromoProps) => {
  const {} = props;

  return (
    <div className="">
      <p className="bg-black py-1 text-center text-sm text-white">
        Sign up and get <strong>20%</strong> off to your first order.
        <Link
          href="/sign-up"
          className="ml-2 font-medium underline underline-offset-4 outline-none ring-focus focus-visible:ring-2"
        >
          Sign Up Now
        </Link>
      </p>
    </div>
  );
};

Promo.displayName = displayName;
