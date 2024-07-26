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
import { TaskForm } from './task-form';
import React from 'react';

interface AddTaskProps {}

const displayName = 'AddTask';

export const AddTask = (props: AddTaskProps) => {
  const {} = props;

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
          className="top-full max-h-[80vh] w-full max-w-screen-sm -translate-y-full overflow-hidden rounded-b-none rounded-t-xl"
        >
          <div className="max-md:scrollbar-thin h-full overflow-auto p-5">
            <div className="sticky top-0 bg-white">
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

            {/* <hr className="my-2" /> */}

            <TaskForm onSubmit={() => {}} />
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};

AddTask.displayName = displayName;
