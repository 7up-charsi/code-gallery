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
  const {} = props;

  const styles = React.useMemo(() => inputStyles(), []);

  return (
    <form className="mt-3">
      <Input label="title" className="w-full" />

      <Input multiline label="description" className="mt-3 w-full" />

      <fieldset className="mt-3">
        <legend className={styles.label()}>priority</legend>

        <div className="mt-1 flex gap-5">
          {['high', 'medium', 'low'].map((priority) => (
            <div
              key={priority}
              className="relative isolate flex items-center justify-center gap-2 px-4 py-2 text-white"
            >
              <input
                data-level={priority}
                type="radio"
                name="priority"
                className="peer absolute inset-0 -z-10 cursor-pointer appearance-none rounded-full bg-success-9 outline-none ring-focus focus-visible:ring-2 data-[level=high]:bg-danger-9 data-[level=medium]:bg-warning-9"
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

      <p
        tabIndex={0}
        className="mt-5 rounded border border-info-6 bg-info-3 p-2 text-info-11"
      >
        <strong className="">Note:</strong> <br /> Default status will
        be set to
        <b> &apos;Not Started&apos;</b>. You can edit the status later
        as needed.
      </p>

      <div className="mt-5 flex items-center justify-end gap-3">
        <Button type="button" variant="text" color="danger">
          reset
        </Button>

        <Button type="submit" variant="solid" color="success">
          submit
        </Button>
      </div>
    </form>
  );
};

TaskForm.displayName = displayName;
