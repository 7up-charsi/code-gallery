'use client';

import { CATEGORY_KEY, TASKS_KEY } from '@/constants/common';
import { useStore } from '@/zustand/store';
import React from 'react';

interface LoadDataProps {}

const displayName = 'LoadData';

export const LoadData = (props: LoadDataProps) => {
  const {} = props;

  const loadData = useStore((state) => state.loadData);

  React.useEffect(() => {
    const storedTasks = localStorage.getItem(TASKS_KEY);
    const storedCategories = localStorage.getItem(CATEGORY_KEY);

    loadData({
      tasks: storedTasks ? JSON.parse(storedTasks) : [],
      categories: storedCategories
        ? JSON.parse(storedCategories)
        : [],
    });
  }, [loadData]);

  return null;
};

LoadData.displayName = displayName;
