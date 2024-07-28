'use client';

import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';
import { useAuth } from '@clerk/nextjs';
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
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
};

ConvexClientProvider.displayName = displayName;
