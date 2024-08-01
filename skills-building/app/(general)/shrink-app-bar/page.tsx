import { AppBar } from './__components/app-bar';

export default function Page() {
  return (
    <>
      <AppBar />

      <main className="mt-[120px] p-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="my-5 space-y-3 first:mt-0 last:mb-0"
          >
            {Array.from({
              length: Math.floor(Math.random() * (15 - 4 + 1)) + 4,
            }).map((_, i, arr) => (
              <div
                key={i}
                style={{
                  width:
                    i + 1 === arr.length
                      ? `${Math.floor(Math.random() * (70 - 10 + 1)) + 10}%`
                      : '100%',
                }}
                className="h-3 rounded bg-gray-200"
              ></div>
            ))}
          </div>
        ))}
      </main>
    </>
  );
}
