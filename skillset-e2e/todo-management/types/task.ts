import { priority, status } from '@/constants/common';

export type Category = { id: string; value: string };

export type Priority = (typeof priority)[number];

export type Status = (typeof status)[number];

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: Priority;
  status: Status;
  overdue: boolean;
  categories: Category[];
};
