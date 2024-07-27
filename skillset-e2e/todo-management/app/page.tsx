'use client';

import { Search } from '@/components/search';
import { useStore } from '@/zustand/store';
import { Task } from '@/components/task';

export default function Home() {
  const tasks = useStore((s) => s.tasks);

  return (
    <div className="p-5">
      <Search />

      <main className="mt-5">
        {tasks.map((ele) => (
          <Task key={ele.id} {...ele} />
        ))}
      </main>
    </div>
  );
}

