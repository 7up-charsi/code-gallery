import { TypewriterEffect } from '../_components/typewriter-effect';

export default function Home() {
  return (
    <main className="bg-muted-2 min-h-[calc(100vh-64px)] p-5">
      <h1
        data-dir="horizontal"
        className="after:grid-line before:grid-line from-muted-12 to-muted-11 relative bg-gradient-to-t bg-clip-text p-6 text-center text-[clamp(50px,5vw,76px)] font-extrabold leading-none tracking-tighter text-transparent before:top-0 after:bottom-0 md:px-16"
      >
        Web{' '}
        <span className="mx-3 inline-block text-[clamp(65px,6vw,90px)]">
          UI / UX
        </span>{' '}
        <span className="block md:hidden"></span>
        Developer
      </h1>

      <h2 className="mb-5 mt-10 text-center text-xl font-medium">
        My Strength
      </h2>

      <TypewriterEffect />

      <div className="mx-auto max-w-screen-md">
        {Array.from({ length: 4 }).map((_, i) => (
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
                className="bg-muted-5 h-3 rounded"
              ></div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
