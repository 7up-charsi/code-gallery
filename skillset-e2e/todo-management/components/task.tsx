import { Task as TaskType } from '@/types/task';
import React from 'react';

interface TaskProps extends TaskType {}

const displayName = 'Task';

export const Task = (props: TaskProps) => {
  const {} = props;

  return <div>Task</div>;
};

Task.displayName = displayName;
