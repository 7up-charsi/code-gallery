'use client';

import { ConvexProvider, ConvexReactClient } from 'convex/react';
import React from 'react';

interface ConvexClientProviderProps {
  children?: React.ReactNode;
}

const displayName = 'ConvexClientProvider';

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!,
);

export const ConvexClientProvider = (
  props: ConvexClientProviderProps,
) => {
  const { children } = props;

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
};

ConvexClientProvider.displayName = displayName;
