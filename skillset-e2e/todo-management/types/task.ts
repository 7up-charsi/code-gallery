export type Task = {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  categories: { _id: string; value: string }[];
};
