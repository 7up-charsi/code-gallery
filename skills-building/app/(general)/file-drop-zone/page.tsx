import { DropZone } from './__components/drop-zone';

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-105px)] items-center justify-center p-5 md:px-8">
      <DropZone />
    </main>
  );
}
