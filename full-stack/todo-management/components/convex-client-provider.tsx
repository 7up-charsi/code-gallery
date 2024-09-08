'use client';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexQueryClient } from '@convex-dev/react-query';
import { ConvexReactClient } from 'convex/react';
import { useAuth } from '@clerk/nextjs';
import React from 'react';

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!,
);

const convexQueryClient = new ConvexQueryClient(convex);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
    },
  },
});

convexQueryClient.connect(queryClient);

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
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ConvexProviderWithClerk>
  );
};

ConvexClientProvider.displayName = displayName;
