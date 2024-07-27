'use client';

import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTrigger,
} from '@typeweave/react/dialog';
import { Button } from '@typeweave/react/button';
import { PlusIcon, XIcon } from 'lucide-react';
import { useStore } from '@/zustand/store';
import { toast } from 'react-toastify';
import { TaskForm } from './task-form';
import React from 'react';

interface AddTaskProps {}

const displayName = 'AddTask';

export const AddTask = (props: AddTaskProps) => {
  const {} = props;

  const addTask = useStore((s) => s.addTask);

  return (
    <DialogRoot>
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
          <div className="relative h-full overflow-auto max-lg:scrollbar-thin">
            <div className="sticky top-0 z-50 bg-white px-5 pb-2 pt-5">
              <div className="flex h-10 items-center justify-between rounded-full bg-primary-3 px-5">
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
            </div>

            <div className="p-5 pt-2">
              <TaskForm
                onSubmit={async (values, reset) => {
                  await addTask({
                    title: values.title,
                    description: values.description,
                    categoryIds: values.categoryIds.map(
                      (ele) => ele.id,
                    ),
                    priorityId: values.priorityId,
                    dueDate: values.dueDate,
                  });

                  toast.success('task added...!');
                  reset();
                }}
              />
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};

AddTask.displayName = displayName;
