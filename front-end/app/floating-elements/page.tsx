import { DefaultBehaviour } from './_components/default-behaviour';
import { InlineMiddleware } from './_components/inline-middeware';
import { ShiftMiddleware } from './_components/shift-middleware';
import { ArrowMiddleware } from './_components/arrow-middleware';
import { FlipMiddleware } from './_components/flip-middleware';
import { HideMiddleware } from './_components/hide-middleware';

export default function Home() {
  return (
    <main className="grid auto-rows-[70vh] grid-cols-1 gap-5 p-5 md:px-8 lg:grid-cols-2">
      <DefaultBehaviour />
      <FlipMiddleware />
      <ShiftMiddleware />
      <HideMiddleware />
      <ArrowMiddleware />
      <InlineMiddleware />
    </main>
  );
}
