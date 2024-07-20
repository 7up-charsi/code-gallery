import { AppBar } from '@/components/app-bar';

export default function Home() {
  return (
    <>
      <AppBar />
      <main className="mt-16 space-y-3 p-5">
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={i}
            style={{ width: `${Math.random() * 50 + 50}%` }}
            className="h-3 rounded bg-gray-200"
          ></div>
        ))}
      </main>
    </>
  );
}
