'use client';

import {
  CheckCircleIcon,
  CircleCheckIcon,
  CircleIcon,
} from 'lucide-react';
import { Input, inputStyles } from '@typeweave/react/input';
import { Button } from '@typeweave/react/button';
import React from 'react';

type FormValues = {};

interface TaskFormProps {
  onSubmit: () => void;
  defaultValues?: FormValues;
}

const displayName = 'TaskForm';

export const TaskForm = (props: TaskFormProps) => {
  const { defaultValues } = props;

  const isEditForm = !!defaultValues;

  const styles = React.useMemo(() => inputStyles(), []);

  return (
    <form className="mt-3">
      <Input label="title" className="w-full" />

      <Input multiline label="description" className="mt-3 w-full" />

      <fieldset className="mt-3">
        <legend className={styles.label()}>priority</legend>

        <div className="mt-1 flex flex-wrap gap-x-5 gap-y-3">
          {['high', 'medium', 'low'].map((priority) => (
            <div
              key={priority}
              className="relative isolate flex shrink-0 items-center justify-center gap-2 px-4 py-2 text-white"
            >
              <input
                data-priority={priority}
                type="radio"
                value={priority}
                name="priority"
                className="peer absolute inset-0 -z-10 cursor-pointer appearance-none rounded-full bg-success-9 outline-none ring-focus focus-visible:ring-2 data-[priority=high]:bg-danger-9 data-[priority=medium]:bg-warning-9"
              />

              <CircleIcon
                size={14}
                className="pointer-events-none block peer-checked:hidden"
              />

              <CircleIcon
                size={14}
                className="pointer-events-none hidden fill-current peer-checked:block"
              />

              <span className="pointer-events-none text-sm capitalize">
                {priority}
              </span>
            </div>
          ))}
        </div>
      </fieldset>

      {isEditForm && (
        <fieldset className="mt-3">
          <legend className={styles.label()}>status</legend>

          <div className="mt-1 flex flex-wrap gap-x-5 gap-y-3">
            {['not started', 'in progress', 'completed'].map(
              (status) => (
                <div
                  key={status}
                  data-status={status.replace(' ', '-')}
                  className="group relative isolate flex shrink-0 items-center justify-center gap-2 px-4 py-2 text-white data-[status=not-started]:text-muted-11"
                >
                  <input
                    type="radio"
                    value={status}
                    name="status"
                    className="peer absolute inset-0 -z-10 cursor-pointer appearance-none rounded-full bg-muted-3 outline-none ring-focus focus-visible:ring-2 group-data-[status=completed]:bg-success-9 group-data-[status=in-progress]:bg-info-9"
                  />

                  <CircleIcon
                    size={14}
                    className="pointer-events-none block peer-checked:hidden"
                  />

                  <CircleIcon
                    size={14}
                    className="pointer-events-none hidden fill-current peer-checked:block"
                  />

                  <span className="pointer-events-none text-sm capitalize">
                    {status}
                  </span>
                </div>
              ),
            )}
          </div>
        </fieldset>
      )}

      {!isEditForm && (
        <p
          tabIndex={0}
          className="mt-5 text-balance border-y border-muted-6 py-2 text-center text-foreground/80"
        >
          Default{' '}
          <strong className="font-medium text-foreground">
            Status
          </strong>{' '}
          will be set to{' '}
          <strong className="font-medium text-foreground">
            &apos;Not Started&apos;
          </strong>
          . You can edit the status later as needed.
        </p>
      )}

      <div className="mt-5 flex items-center justify-end gap-3">
        <Button type="button" variant="text" color="danger">
          reset
        </Button>

        <Button type="submit" variant="solid" color="success">
          {isEditForm ? 'edit' : 'submit'}
        </Button>
      </div>
    </form>
  );
};

TaskForm.displayName = displayName;
