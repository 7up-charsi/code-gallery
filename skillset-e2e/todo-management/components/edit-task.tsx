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
import { Button } from '@typeweave/react/button';
import { useStore } from '@/zustand/store';
import { toast } from 'react-toastify';
import { TaskForm } from './task-form';
import React from 'react';

interface EditTaskProps {
  id: string;
}

const displayName = 'EditTask';

export const EditTask = (props: EditTaskProps) => {
  const { id } = props;

  const editTask = useStore((s) => s.editTask);
  const categories = useStore((s) => s.categories);

  const task = useStore((s) => s.tasks.find((ele) => ele.id === id));

  const [open, setOpen] = React.useState(false);

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
                defaultValues={{
                  categoryIds: categories.filter((ele) =>
                    task?.categoryIds.includes(ele.id),
                  ),
                  description: task?.description ?? '',
                  priorityId: task?.priorityId ?? '',
                  statusId: task?.statusId ?? '',
                  title: task?.title ?? '',
                }}
                onSubmit={async (values) => {
                  await editTask(id, {
                    title: values.title,
                    description: values.description,
                    categoryIds: values.categoryIds.map(
                      (ele) => ele.id,
                    ),
                    priorityId: values.priorityId,
                    statusId: values.statusId,
                  });

                  toast.success('task edited...!');
                  setOpen(false);
                }}
              />
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};

EditTask.displayName = displayName;
