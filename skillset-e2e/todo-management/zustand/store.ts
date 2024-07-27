import {
  CATEGORY_KEY,
  COMPLETED_STATUS_ID,
  DEFAULT_STATUS_ID,
  IN_PROGRESS_STATUS_ID,
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
  markComplete: (id: string) => void;
  markInProgress: (id: string) => void;
  addTask: (
    payload: Pick<
      Task,
      'title' | 'description' | 'priorityId' | 'categoryIds'
    >,
  ) => Promise<void>;
  editTask: (
    id: string,
    payload: Pick<
      Task,
      | 'title'
      | 'description'
      | 'priorityId'
      | 'categoryIds'
      | 'statusId'
    >,
  ) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  addCategory: (payload: string) => Promise<void>;
  editCategory: (id: string, payload: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
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
  markComplete: (id) => {
    set((state) => {
      const tasks = state.tasks.map((ele) =>
        ele.id === id
          ? { ...ele, statusId: COMPLETED_STATUS_ID }
          : ele,
      );

      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

      return { ...state, tasks };
    });
  },
  markInProgress: (id) => {
    set((state) => {
      const tasks = state.tasks.map((ele) =>
        ele.id === id
          ? { ...ele, statusId: IN_PROGRESS_STATUS_ID }
          : ele,
      );

      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

      return { ...state, tasks };
    });
  },
  addCategory: async (label) => {
    set((state) => {
      const categories: Category[] = [
        ...state.categories,
        { id: uuidV7(), label },
      ];

      localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));

      return { ...state, categories };
    });
  },
  editCategory: async (id, label) => {
    set((state) => {
      const categories = state.categories.map((category) =>
        category.id === id ? { ...category, label } : category,
      );

      localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));

      return { ...state, categories };
    });
  },
  deleteCategory: async (id) => {
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
          priorityId: task.priorityId,
          title: task.title,
          id: uuidV7(),
          statusId: DEFAULT_STATUS_ID,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ];

      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

      return { ...state, tasks };
    });
  },
  editTask: async (id, task) => {
    set((state) => {
      const tasks = state.tasks.map((ele) =>
        ele.id === id
          ? {
              ...ele,
              ...task,
              createdAt: ele.createdAt,
              updatedAt: Date.now(),
            }
          : ele,
      );

      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

      return { ...state, tasks };
    });
  },
  deleteTask: async (id) => {
    set((state) => {
      const tasks = state.tasks.filter((ele) => ele.id !== id);

      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

      return { ...state, tasks };
    });
  },
}));
