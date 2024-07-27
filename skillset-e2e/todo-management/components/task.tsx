'use client';

import { priorities, statuses } from '@/constants/common';
import { Task as TaskType } from '@/types/task';
import { useStore } from '@/zustand/store';
import { format } from 'date-fns';
import React from 'react';

interface TaskProps extends TaskType {}

const displayName = 'Task';

export const Task = (props: TaskProps) => {
  const {
    categoryIds,
    description,
    dueDate,
    id,
    overdue,
    priorityId,
    statusId,
    title,
  } = props;

  const categories = useStore((s) => s.categories);

  const date = format(dueDate, 'dd-MM-yyyy');

  const priority = priorities.find(
    (ele) => ele.id === priorityId,
  )?.label;

  const status = statuses.find((ele) => ele.id === statusId)?.label;

  return (
    <article
      aria-labelledby={id + '-label'}
      aria-describedby={id + '-desc'}
      data-over-due={overdue}
      className="broder-muted-6 rounded border p-2 data-[over-due=true]:border-2 data-[over-due=true]:border-danger-8"
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

      <dl className="mt-3">
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
          <dt className="sr-only">due date</dt>
          <dd>
            <time
              dateTime={date}
              className="text-sm text-foreground/80"
            >
              {date}
            </time>
          </dd>

          <div className="grow"></div>

          <dt className="sr-only">status</dt>
          <dd className="">
            <span
              data-status={status}
              className="data-[status=completed]:text-success11 rounded-full bg-muted-3 px-2 py-1 text-sm capitalize data-[status=completed]:bg-success-3 data-[status=in-progress]:bg-info-3 data-[status=in-progress]:text-info-11"
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
