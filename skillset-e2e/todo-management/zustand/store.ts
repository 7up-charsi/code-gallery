import { Category, Task } from '@/types/task';
import { v7 as uuidV7 } from 'uuid';
import { create } from 'zustand';

type Store = {
  tasks: Task[];
  categories: Category[];
  addTask: (
    payload: Pick<
      Task,
      'title' | 'description' | 'dueDate' | 'priority' | 'categories'
    >,
  ) => void;
  editTask: (
    id: string,
    payload: Pick<
      Task,
      | 'title'
      | 'description'
      | 'dueDate'
      | 'priority'
      | 'categories'
      | 'status'
    >,
  ) => void;
  deleteTask: (id: string) => void;
  addCategory: (payload: string) => void;
  editCategory: (id: string, payload: string) => void;
  deleteCategory: (id: string) => void;
};

const CATEGORY_KEY = 'categories';
const TASKS_KEY = 'tasks';

const storedTasks = localStorage.getItem(TASKS_KEY);
const storedCategories = localStorage.getItem(CATEGORY_KEY);

export const useStore = create<Store>((set) => ({
  tasks: storedTasks ? JSON.parse(storedTasks) : [],
  categories: storedCategories ? JSON.parse(storedCategories) : [],
  addCategory: (value) => {
    set((state) => {
      const categories: Category[] = [
        ...state.categories,
        { id: uuidV7(), value },
      ];

      localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));

      return { ...state, categories };
    });
  },
  editCategory: (id, value) => {
    set((state) => {
      const categories = state.categories.map((category) =>
        category.id === id ? { ...category, value } : category,
      );

      localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));

      return { ...state, categories };
    });
  },
  deleteCategory: (id) => {
    set((state) => {
      const categories = state.categories.filter(
        (ele) => ele.id !== id,
      );

      localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));

      return { ...state, categories };
    });
  },
  addTask: (task) => {
    set((state) => {
      const tasks: Task[] = [
        ...state.tasks,
        {
          categories: task.categories,
          description: task.description,
          dueDate: task.dueDate,
          priority: task.priority,
          title: task.title,
          id: uuidV7(),
          overdue: false,
          status: 'not-started',
        },
      ];

      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

      return { ...state, tasks };
    });
  },
  editTask: (id, task) => {
    set((state) => {
      const tasks = state.tasks.map((ele) =>
        ele.id === id ? { ...ele, ...task } : ele,
      );

      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

      return { ...state, tasks };
    });
  },
  deleteTask: (id) => {
    set((state) => {
      const tasks = state.tasks.filter((ele) => ele.id !== id);

      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

      return { ...state, tasks };
    });
  },
}));
