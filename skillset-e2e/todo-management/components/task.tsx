'use client';

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
  TrashIcon,
} from 'lucide-react';
import { DialogClose } from '@typeweave/react/dialog';
import { Id } from '@/convex/_generated/dataModel';
import { Button } from '@typeweave/react/button';
import { Task as TaskType } from '@/types/task';
import { api } from '@/convex/_generated/api';
import { AlertDialog } from './alert-dialog';
import { useMutation } from 'convex/react';
import { toast } from 'react-toastify';
import { EditTask } from './edit-task';
import React from 'react';

interface TaskProps extends TaskType {}

const displayName = 'Task';

export const Task = (props: TaskProps) => {
  const { categories, description, _id, priority, status, title } =
    props;

  const _delete = useMutation(api.task._delete);
  const complete = useMutation(api.task.complete);
  const started = useMutation(api.task.started);

  return (
    <article
      aria-labelledby={_id + '-label'}
      aria-describedby={_id + '-desc'}
      className="broder-muted-6 rounded border p-2"
    >
      <div
        id={_id + '-label'}
        className="text-balance font-medium text-muted-12 first-letter:uppercase"
      >
        {title}
      </div>

      <div
        id={_id + '-desc'}
        className="mt-1 text-balance text-sm first-letter:uppercase"
      >
        {description}
      </div>

      <dl className="mt-4">
        <div className="">
          <dt className="sr-only">categories</dt>
          <dd className="flex flex-wrap gap-2">
            <p className="text-sm text-foreground/80">
              {categories.map((ele) => ele.value).join(', ')}
            </p>
          </dd>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <dt className="sr-only">actions</dt>
          <dd className="content-center space-x-2">
            {status === 'started' && (
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
                      onPress={() =>
                        complete({ _id: _id as Id<'tasks'> })
                      }
                    >
                      SURE
                    </Button>
                  </DialogClose>
                </AlertDialog>

                <TooltipPortal>
                  <TooltipContent className="bg-black/70 text-white">
                    <TooltipArrow />
                    <span>Mark as complete</span>
                  </TooltipContent>
                </TooltipPortal>
              </TooltipRoot>
            )}

            {status === 'pending' && (
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
                      color="success"
                      onPress={() =>
                        started({ _id: _id as Id<'tasks'> })
                      }
                    >
                      SURE
                    </Button>
                  </DialogClose>
                </AlertDialog>

                <TooltipPortal>
                  <TooltipContent className="bg-black/70 text-white">
                    <TooltipArrow />
                    <span>Mark as started</span>
                  </TooltipContent>
                </TooltipPortal>
              </TooltipRoot>
            )}

            <EditTask _id={_id} />

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
              <Button
                color="danger"
                onPress={async () => {
                  _delete({ _id: _id as Id<'tasks'> });
                  toast.success('task deleted...!');
                }}
              >
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
