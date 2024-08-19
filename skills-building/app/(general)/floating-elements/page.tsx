import { DefaultBehaviour } from './__components/default-behaviour';
import { InlineMiddleware } from './__components/inline-middeware';
import { FlipMiddleware } from './__components/flip-middleware';

export default function Home() {
  return (
    <main className="grid auto-rows-[70vh] grid-cols-1 gap-5 p-5 md:px-8 lg:grid-cols-2">
      <DefaultBehaviour />
      <FlipMiddleware />
      <InlineMiddleware />
    </main>
  );
}
