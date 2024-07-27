'use client';

import { CheckCheckIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { priorities, statuses } from '@/constants/common';
import { Button } from '@typeweave/react/button';
import { Task as TaskType } from '@/types/task';
import { useStore } from '@/zustand/store';
import React from 'react';

interface TaskProps extends TaskType {}

const displayName = 'Task';

export const Task = (props: TaskProps) => {
  const {
    categoryIds,
    description,
    id,
    priorityId,
    statusId,
    title,
  } = props;

  const categories = useStore((s) => s.categories);
  const markComplete = useStore((s) => s.markComplete);
  const deleteTask = useStore((s) => s.deleteTask);

  const priority = priorities.find(
    (ele) => ele.id === priorityId,
  )?.label;

  const status = statuses.find((ele) => ele.id === statusId)?.label;

  return (
    <article
      aria-labelledby={id + '-label'}
      aria-describedby={id + '-desc'}
      className="broder-muted-6 rounded border p-2"
    >
      <div
        id={id + '-label'}
        className="text-balance font-medium text-muted-12 first-letter:uppercase"
      >
        {title}
      </div>

      <div
        id={id + '-desc'}
        className="mt-1 text-balance text-sm first-letter:uppercase"
      >
        {description}
      </div>

      <dl className="mt-4">
        <div className="">
          <dt className="sr-only">categories</dt>
          <dd className="flex flex-wrap gap-2">
            <p className="text-sm text-foreground/80">
              {categories
                .filter((ele) => categoryIds.includes(ele.id))
                .map((ele) => ele.label)
                .join(', ')}
            </p>
          </dd>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <dt className="sr-only">actions</dt>
          <dd className="content-center space-x-2">
            <Button
              isIconOnly
              aria-label="mark task complete"
              size="sm"
              color="success"
              variant="text"
              onPress={() => markComplete(id)}
            >
              <CheckCheckIcon />
            </Button>

            <Button
              isIconOnly
              aria-label="edit task"
              size="sm"
              color="info"
              variant="text"
            >
              <PencilIcon />
            </Button>

            <Button
              isIconOnly
              aria-label="delete task"
              size="sm"
              color="danger"
              variant="text"
              onPress={() => deleteTask(id)}
            >
              <TrashIcon />
            </Button>
          </dd>

          <div className="grow"></div>

          <dt className="sr-only">status</dt>
          <dd className="">
            <span
              data-status={status}
              className="rounded-full px-2 py-1 text-sm capitalize data-[status=completed]:text-success-11 data-[status=in-progress]:text-info-11"
            >
              {status}
            </span>
          </dd>

          <dt className="sr-only">priority</dt>
          <dd>
            <span
              data-priority={priority}
              className="rounded-full bg-success-9 px-2 py-1 text-sm capitalize text-white data-[priority=high]:bg-danger-9 data-[priority=medium]:bg-warning-9"
            >
              {priority}
            </span>
          </dd>
        </div>
      </dl>
    </article>
  );
};

Task.displayName = displayName;
