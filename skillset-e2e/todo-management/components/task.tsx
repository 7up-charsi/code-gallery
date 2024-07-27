'use client';

import {
  COMPLETED_STATUS_ID,
  DEFAULT_STATUS_ID,
  IN_PROGRESS_STATUS_ID,
  priorities,
  statuses,
} from '@/constants/common';
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from '@typeweave/react/tooltip';
import {
  CheckCheckIcon,
  CircleDashedIcon,
  PencilIcon,
  TrashIcon,
} from 'lucide-react';
import { DialogClose } from '@typeweave/react/dialog';
import { Button } from '@typeweave/react/button';
import { Task as TaskType } from '@/types/task';
import { AlertDialog } from './alert-dialog';
import { useStore } from '@/zustand/store';
import { EditTask } from './edit-task';
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
  const markInProgress = useStore((s) => s.markInProgress);
  const deleteTask = useStore((s) => s.deleteTask);

  const priority = priorities.find(
    (ele) => ele.id === priorityId,
  )?.label;

  const selectedStatus = statuses.find((ele) => ele.id === statusId);
  const status = selectedStatus?.label;

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
            {selectedStatus?.id === IN_PROGRESS_STATUS_ID && (
              <TooltipRoot>
                <AlertDialog
                  title="Mark as Complete"
                  description="Are you sure you want to proceed?"
                  trigger={
                    <TooltipTrigger>
                      <Button
                        isIconOnly
                        aria-label="mark task complete"
                        size="sm"
                        color="success"
                        variant="text"
                      >
                        <CheckCheckIcon />
                      </Button>
                    </TooltipTrigger>
                  }
                >
                  <DialogClose>
                    <Button
                      color="success"
                      onPress={() => markComplete(id)}
                    >
                      Complete
                    </Button>
                  </DialogClose>
                </AlertDialog>

                <TooltipPortal>
                  <TooltipContent>
                    <TooltipArrow />
                    <span>Mark complete</span>
                  </TooltipContent>
                </TooltipPortal>
              </TooltipRoot>
            )}

            {selectedStatus?.id === DEFAULT_STATUS_ID && (
              <TooltipRoot>
                <AlertDialog
                  title="Mark as in-Progress"
                  description="Are you sure you want to proceed?"
                  trigger={
                    <TooltipTrigger>
                      <Button
                        isIconOnly
                        aria-label="mark task in-progress"
                        size="sm"
                        color="info"
                        variant="text"
                      >
                        <CircleDashedIcon />
                      </Button>
                    </TooltipTrigger>
                  }
                >
                  <DialogClose>
                    <Button
                      color="info"
                      onPress={() => markInProgress(id)}
                    >
                      in Progress
                    </Button>
                  </DialogClose>
                </AlertDialog>

                <TooltipPortal>
                  <TooltipContent>
                    <TooltipArrow />
                    <span>Mark in Progress</span>
                  </TooltipContent>
                </TooltipPortal>
              </TooltipRoot>
            )}

            <EditTask id={id} />

            <AlertDialog
              title="Delete Task"
              description="Are you sure you want to proceed? This action cannot be undone."
              trigger={
                <Button
                  isIconOnly
                  aria-label="delete task"
                  size="sm"
                  color="danger"
                  variant="text"
                >
                  <TrashIcon />
                </Button>
              }
            >
              <Button color="danger" onPress={() => deleteTask(id)}>
                Delete
              </Button>
            </AlertDialog>
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
