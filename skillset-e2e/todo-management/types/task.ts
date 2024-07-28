export type Category = { id: string; label: string };

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  categories: { id: string; value: string }[];
};
