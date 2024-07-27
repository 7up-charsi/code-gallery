'use client';

import { useAuthActions } from '@convex-dev/auth/react';
import { GithubIcon, Loader2Icon } from 'lucide-react';
import { Button } from '@typeweave/react/button';
import { siteConfig } from '@/config/site';
import React from 'react';

export default function SignInPage() {
  const { signIn } = useAuthActions();

  const [loading, setLoading] = React.useState(false);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-muted-2">
      <article
        aria-labelledby="title"
        aria-describedby="desc"
        className="flex w-full max-w-sm flex-col items-center rounded border border-muted-6 bg-white p-5 shadow-lg"
      >
        <h1 id="title" className="font-bold capitalize text-muted-12">
          {siteConfig.name}
        </h1>

        <p
          id="desc"
          className="mt-5 text-balance text-center text-sm"
        >
          This project is for <strong>demonstration</strong> purposes
          only. <br />
          Please <strong>do not use</strong> it for daily life as data
          can be <strong>deleted</strong> from the database at any
          time.
        </p>

        <Button
          onPress={async () => {
            if (loading) return;
            setLoading(true);
            await signIn('github', { redirectTo: '/' });
          }}
          startContent={
            loading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <GithubIcon />
            )
          }
          className="mt-5"
        >
          Sign in with GitHub
        </Button>
      </article>
    </div>
  );
}
