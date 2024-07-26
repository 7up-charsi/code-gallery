export type Category = { id: string; label: string };

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priorityId: string;
  statusId: string;
  overdue: boolean;
  categoryIds: string[];
};
