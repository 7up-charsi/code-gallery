import {
  CATEGORY_KEY,
  DEFAULT_STATUS_ID,
  TASKS_KEY,
} from '@/constants/common';
import { Category, Task } from '@/types/task';
import { v7 as uuidV7 } from 'uuid';
import { create } from 'zustand';

type Store = {
  tasks: Task[];
  categories: Category[];
  dataLoaded: boolean;
  loadData: (payload: {
    categories: Category[];
    tasks: Task[];
  }) => void;
  addTask: (
    payload: Pick<
      Task,
      | 'title'
      | 'description'
      | 'dueDate'
      | 'priorityId'
      | 'categoryIds'
    >,
  ) => Promise<void>;
  editTask: (
    id: string,
    payload: Pick<
      Task,
      | 'title'
      | 'description'
      | 'dueDate'
      | 'priorityId'
      | 'categoryIds'
      | 'statusId'
    >,
  ) => void;
  deleteTask: (id: string) => void;
  addCategory: (payload: string) => void;
  editCategory: (id: string, payload: string) => void;
  deleteCategory: (id: string) => void;
};

export const useStore = create<Store>((set) => ({
  tasks: [],
  categories: [],
  dataLoaded: false,
  loadData: ({ categories, tasks }) => {
    set((state) => ({
      ...state,
      categories,
      tasks,
      dataLoaded: !!(categories && tasks),
    }));
  },
  addCategory: (label) => {
    set((state) => {
      const categories: Category[] = [
        ...state.categories,
        { id: uuidV7(), label },
      ];

      localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));

      return { ...state, categories };
    });
  },
  editCategory: (id, label) => {
    set((state) => {
      const categories = state.categories.map((category) =>
        category.id === id ? { ...category, label } : category,
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
  addTask: async (task) => {
    set((state) => {
      const tasks: Task[] = [
        ...state.tasks,
        {
          categoryIds: task.categoryIds,
          description: task.description,
          dueDate: task.dueDate,
          priorityId: task.priorityId,
          title: task.title,
          id: uuidV7(),
          overdue: false,
          statusId: DEFAULT_STATUS_ID,
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
