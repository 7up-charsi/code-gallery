'use client';

import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTrigger,
} from '@typeweave/react/dialog';
import { Id } from '@/convex/_generated/dataModel';
import { Button } from '@typeweave/react/button';
import { PlusIcon, XIcon } from 'lucide-react';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { toast } from 'react-toastify';
import { TaskForm } from './task-form';
import React from 'react';

interface AddTaskProps {}

const displayName = 'AddTask';

export const AddTask = (props: AddTaskProps) => {
  const {} = props;

  const addTask = useMutation(api.task.create);

  const [open, setOpen] = React.useState(false);

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          isIconOnly
          aria-label="add task"
          color="primary"
          className="text-2xl"
        >
          <PlusIcon />
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
                add task
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
              onSubmit={async (values, reset) => {
                await addTask({
                  title: values.title,
                  description: values.description,
                  priority: values.priority,
                  categories: values.categories.map(
                    (ele) => ele._id as Id<'categories'>,
                  ),
                });

                toast.success('task added...!');
                reset();
                setOpen(false);
              }}
            />
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};

AddTask.displayName = displayName;
