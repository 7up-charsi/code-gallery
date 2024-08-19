import { DefaultBehaviour } from './__components/default-behaviour';
import { InlineMiddleware } from './__components/inline-middeware';
import { ShiftMiddleware } from './__components/shift-middleware';
import { ArrowMiddleware } from './__components/arrow-middleware';
import { FlipMiddleware } from './__components/flip-middleware';
import { HideMiddleware } from './__components/hide-middleware';

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
