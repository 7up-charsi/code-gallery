'use client';

import { usePaginatedQuery, useQuery } from 'convex/react';
import { useSearchParams } from 'next/navigation';
import { Task as TaskType } from '@/types/task';
import { api } from '@/convex/_generated/api';
import { Loader2Icon } from 'lucide-react';
import { Task } from '@/components/task';
import React from 'react';

export default function Home() {
  const searchParams = useSearchParams();

  const query = searchParams.get('query') ?? '';

  const tasks = useQuery(api.task.tasks, { query });

  return (
    <main className="space-y-3 p-5">
      {/* {isLoading && (
        <div className="flex items-center justify-center pt-10">
          <Loader2Icon className="size-10 animate-spin" />
        </div>
      )} */}

      {/* {!isLoading && !tasks?.length ? (
        <div className="pt-10 text-center">
          <span className="text-xl">
            The database is currently empty. <br /> Please add some
            tasks to get started.
          </span>
        </div>
      ) : null} */}

      {tasks?.map((ele) => <Task key={ele._id} {...ele} />)}
    </main>
  );
}

