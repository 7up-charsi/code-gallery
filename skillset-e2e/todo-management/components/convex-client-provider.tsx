'use client';

import { ConvexAuthProvider } from '@convex-dev/auth/react';
import { ConvexReactClient } from 'convex/react';
import React from 'react';

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!,
);

interface ConvexClientProviderProps {
  children?: React.ReactNode;
}

const displayName = 'ConvexClientProvider';

export const ConvexClientProvider = (
  props: ConvexClientProviderProps,
) => {
  const { children } = props;

  return (
    <ConvexAuthProvider client={convex}>
      {children}
    </ConvexAuthProvider>
  );
};

ConvexClientProvider.displayName = displayName;
