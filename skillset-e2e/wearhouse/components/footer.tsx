import { Button } from '@typeweave/react/button';
import { Input } from '@typeweave/react/input';
import { siteConfig } from '@/config/site';
import { MailIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface FooterProps {}

const displayName = 'Footer';

export const Footer = (props: FooterProps) => {
  const {} = props;

  return (
    <footer className="mt-10 [--footer-bg:theme(colors.muted-4)]">
      <div className="relative isolate w-full px-5 before:absolute before:left-0 before:top-1/2 before:-z-50 before:h-1/2 before:w-full before:bg-[var(--footer-bg)]">
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
      </div>

      <div className="grid grid-cols-2 gap-5 bg-[var(--footer-bg)] px-5 pt-5">
        <div className="col-span-2">
          <h2 className="font-integral text-3xl font-bold text-black">
            {siteConfig.name}
          </h2>

          <p className="mt-2 text-sm">{siteConfig.description}</p>
        </div>

        <nav
          aria-labelledby="company-links-nav"
          className="flex flex-col gap-3"
        >
          <span
            id="company-links-nav"
            className="text-sm font-medium capitalize text-black"
          >
            company
          </span>
          {['about', 'features', 'links', 'career'].map((ele) => (
            <Link
              key={ele}
              href="/"
              className="text-sm capitalize ring-focus hover:text-black/80 focus-visible:ring-2 active:text-black"
            >
              {ele}
            </Link>
          ))}
        </nav>

        <nav
          aria-labelledby="help-links-nav"
          className="flex flex-col gap-3"
        >
          <span
            id="help-links-nav"
            className="text-sm font-medium capitalize text-black"
          >
            help
          </span>
          {[
            'Customer Support',
            'Delivery Details',
            'Terms & Conditions',
            'Privacy Policy',
          ].map((ele) => (
            <Link
              key={ele}
              href="/"
              className="text-sm capitalize ring-focus hover:text-black/80 focus-visible:ring-2 active:text-black"
            >
              {ele}
            </Link>
          ))}
        </nav>

        <nav
          aria-labelledby="faq-links-nav"
          className="flex flex-col gap-3"
        >
          <span
            id="faq-links-nav"
            className="text-sm font-medium capitalize text-black"
          >
            FAQ
          </span>
          {['Account', 'Manage Deliveries', 'Orders', 'Payment'].map(
            (ele) => (
              <Link
                key={ele}
                href="/"
                className="text-sm capitalize ring-focus hover:text-black/80 focus-visible:ring-2 active:text-black"
              >
                {ele}
              </Link>
            ),
          )}
        </nav>

        <nav
          aria-labelledby="resources-links-nav"
          className="flex flex-col gap-3"
        >
          <span
            id="resources-links-nav"
            className="text-sm font-medium capitalize text-black"
          >
            resources
          </span>
          {[
            'Free eBook',
            'Development Tutorial',
            'How to - Blog',
            'Youtube Playlist',
          ].map((ele) => (
            <Link
              key={ele}
              href="/"
              className="text-sm capitalize ring-focus hover:text-black/80 focus-visible:ring-2 active:text-black"
            >
              {ele}
            </Link>
          ))}
        </nav>

        <div className="col-start-1 -col-end-1 text-center">
          <hr className="my-5 border-muted-8" />

          <p className="pb-10">
            {siteConfig.name} © 2000-2023, All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = displayName;
