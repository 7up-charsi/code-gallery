export type Category = { id: string; value: string };

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'Low' | 'Medium' | 'High';
  status: 'not-started' | 'in-progress' | 'completed';
  overdue: boolean;
  categories: Category[];
};
