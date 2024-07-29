'use client';

import { convexQuery } from '@convex-dev/react-query';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Task as TaskType } from '@/types/task';
import { api } from '@/convex/_generated/api';
import { Loader2Icon } from 'lucide-react';
import { Task } from '@/components/task';
import React from 'react';

export default function Home() {
  const searchParams = useSearchParams();

  const query = searchParams.get('query') ?? '';

  const { data, isLoading, isError } = useQuery(
    convexQuery(api.task.tasks, { query }),
  );

  return (
    <main className="space-y-3 p-5">
      {isError && (
        <div className="flex items-center justify-center pt-10 text-danger-11">
          Someting went wrong
        </div>
      )}

      {isLoading && !data && (
        <div className="flex items-center justify-center pt-10">
          <Loader2Icon className="size-10 animate-spin" />
        </div>
      )}

      {!isLoading && data && !data.length ? (
        <div className="pt-10 text-center">
          <span className="text-xl">
            The database is currently empty. <br /> Please add some
            tasks to get started.
          </span>
        </div>
      ) : null}

      {data?.map((ele) => <Task key={ele._id} {...ele} />)}
    </main>
  );
}

