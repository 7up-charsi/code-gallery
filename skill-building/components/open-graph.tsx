import { rootSiteConfig } from '@/config/root-site';
import React from 'react';

interface OpenGraphProps {
  name: string;
}

const displayName = 'OpenGraph';

export const OpenGraph = (props: OpenGraphProps) => {
  const { name } = props;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-0 bg-white p-5">
      <h1 className="text-balance text-center text-5xl font-medium capitalize">
        {rootSiteConfig.name}
      </h1>

      <p className="-mt-5 max-w-lg text-balance rounded-lg px-6 py-6 text-center text-3xl text-gray-700">
        {rootSiteConfig.description}
      </p>

      <h2 className="mt-16 text-balance rounded-lg bg-gray-200 px-5 py-3 text-center text-4xl font-medium capitalize">
        {name}
      </h2>
    </div>
  );
};

OpenGraph.displayName = displayName;
