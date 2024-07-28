'use client';

import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTrigger,
} from '@typeweave/react/dialog';
import { PencilIcon, PlusIcon, XIcon } from 'lucide-react';
import { useMutation, useQuery } from 'convex/react';
import { Id } from '@/convex/_generated/dataModel';
import { Button } from '@typeweave/react/button';
import { api } from '@/convex/_generated/api';
import { toast } from 'react-toastify';
import { TaskForm } from './task-form';
import React from 'react';

interface EditTaskProps {
  _id: string;
}

const displayName = 'EditTask';

export const EditTask = (props: EditTaskProps) => {
  const { _id } = props;

  const [open, setOpen] = React.useState(false);

  const task = useQuery(api.task.get, { _id: _id as Id<'tasks'> });

  const editTask = useMutation(api.task.patch);

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          isIconOnly
          aria-label="edit task"
          size="sm"
          color="info"
          variant="text"
        >
          <PencilIcon />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay />

        <DialogContent
          aria-label="add-task-dialog-label"
          className="max-h-[80vh] w-full max-w-screen-sm overflow-hidden max-lg:top-full max-lg:-translate-y-full max-lg:rounded-b-none max-lg:rounded-t-xl"
        >
          <div className="relative h-full overflow-auto p-5 max-lg:scrollbar-thin">
            <div className="flex items-center justify-between py-1">
              <span
                id="add-task-dialog-label"
                className="font-medium capitalize text-muted-12"
              >
                edit task
              </span>

              <DialogClose>
                <Button
                  isIconOnly
                  aria-label="close add task dialog"
                  variant="text"
                  color="danger"
                  size="sm"
                  className="text-xl"
                >
                  <XIcon />
                </Button>
              </DialogClose>
            </div>

            <TaskForm
              defaultValues={
                !task
                  ? undefined
                  : {
                      categories: task.categories,
                      description: task.description,
                      title: task.title,
                      priority: task.priority,
                      status: task.status,
                    }
              }
              onSubmit={async (values) => {
                await editTask({
                  _id: _id as Id<'tasks'>,
                  title: values.title,
                  description: values.description,
                  categories: values.categories.map(
                    (ele) => ele._id as Id<'categories'>,
                  ),
                  priority: values.priority,
                  status: values.status,
                });

                toast.success('task edited...!');
                setOpen(false);
              }}
            />
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};

EditTask.displayName = displayName;
