'use client';

import { useStore } from '@/zustand/store';
import { Task } from '@/components/task';

export default function Home() {
  const tasks = useStore((s) => s.tasks);

  return (
    <main className="space-y-3 p-5">
      {tasks.map((ele) => (
        <Task key={ele.id} {...ele} />
      ))}
    </main>
  );
}

