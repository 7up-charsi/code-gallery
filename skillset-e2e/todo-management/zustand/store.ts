import { Task } from '@/types/task';
import { v7 as uuidV7 } from 'uuid';
import { create } from 'zustand';

type Store = {
  tasks: Task[];
  categories: { id: string; value: string }[];
  addTask: (
    payload: Pick<
      Task,
      'title' | 'description' | 'dueDate' | 'priority' | 'category'
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
      | 'category'
      | 'status'
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
  addCategory: (value) => {
    set((state) => ({
      ...state,
      categories: [...state.categories, { id: uuidV7(), value }],
    }));
  },
  editCategory: (id, value) => {
    set((state) => {
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === id ? { ...category, value } : category,
        ),
      };
    });
  },
  deleteCategory: (id) => {
    set((state) => ({
      ...state,
      categories: state.categories.filter((ele) => ele.id !== id),
    }));
  },
  addTask: (task) => {
    set((state) => ({
      ...state,
      tasks: [
        ...state.tasks,
        {
          category: task.category,
          description: task.description,
          dueDate: task.dueDate,
          priority: task.priority,
          title: task.title,
          id: uuidV7(),
          overdue: false,
          status: 'not-started',
        },
      ],
    }));
  },
  editTask: (id, task) => {
    set((state) => ({
      ...state,
      tasks: state.tasks.map((ele) =>
        ele.id === id ? { ...ele, ...task } : ele,
      ),
    }));
  },
  deleteTask: (id) => {
    set((state) => ({
      ...state,
      tasks: state.tasks.filter((ele) => ele.id !== id),
    }));
  },
}));
