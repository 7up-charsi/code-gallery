'use client';

import { useSearchParams } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';
import { Task } from '@/components/task';
import React from 'react';

export default function Home() {
  const searchParams = useSearchParams();

  const query = searchParams.get('query') ?? '';



  return (
    <main className="space-y-3 p-5">
      {/* <div className="flex items-center justify-center pt-10">
          <Loader2Icon className="size-10 animate-spin" />
        </div> */}

      {/* {tasks.map((ele) => (
        <Task key={ele.id} {...ele} />
      ))} */}
    </main>
  );
}

