export type Category = { id: string; label: string };

export type Task = {
  id: string;
  title: string;
  description: string;
  priorityId: string;
  statusId: string;
  categoryIds: string[];
};
