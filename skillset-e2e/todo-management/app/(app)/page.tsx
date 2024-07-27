'use client';

import { priorities, statuses } from '@/constants/common';
import { useSearchParams } from 'next/navigation';
import { Task as TaskType } from '@/types/task';
import { useStore } from '@/zustand/store';
import { Loader2Icon } from 'lucide-react';
import { Task } from '@/components/task';
import Fuse from 'fuse.js';
import React from 'react';

export default function Home() {
  const tasks = useStore((s) => s.tasks);
  const categories = useStore((s) => s.categories);

  const searchParams = useSearchParams();

  const query = searchParams.get('query') ?? '';

  const [filtered, setFiltered] = React.useState<TaskType[] | null>(
    null,
  );

  const [isPending, setTransition] = React.useTransition();

  React.useEffect(() => {
    if (!query) {
      setFiltered(null);
      return;
    }

    setTransition(async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve('');
        }, 1000);
      });

      const fuse = new Fuse(
        tasks.map((task) => ({
          ...task,
          title: task.title,
          description: task.description,
          categories: categories.filter((ele) =>
            task.categoryIds.includes(ele.id),
          ),
          priority: priorities.find(
            (ele) => ele.id === task.priorityId,
          )?.label,
          status: statuses.find((ele) => ele.id === task.statusId)
            ?.label,
        })),
        {
          keys: [
            'title',
            'description',
            'categories.label',
            'priority',
            'status',
          ],
          minMatchCharLength: 2,
        },
      );

      const results = fuse.search(query);

      setFiltered(results.map((ele) => ele.item));
    });
  }, [categories, query, tasks]);

  return (
    <main className="space-y-3 p-5">
      {isPending && (
        <div className="flex items-center justify-center pt-10">
          <Loader2Icon className="size-10 animate-spin" />
        </div>
      )}

      {!isPending &&
        (filtered ?? tasks).map((ele) => (
          <Task key={ele.id} {...ele} />
        ))}
    </main>
  );
}

