import { Task as TaskType } from '@/types/task';
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
    </article>
  );
};

Task.displayName = displayName;
