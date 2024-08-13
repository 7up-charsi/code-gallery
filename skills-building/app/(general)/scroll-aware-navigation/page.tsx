export default function Home() {
  return (
    <main className="space-y-5 p-5 md:px-8">
      {Array.from({ length: 10 }).map((_, i) => (
        <section key={i} id={`${i + 1}`} className="scroll-mt-40">
          <h2 className="text-2xl font-medium capitalize">
            section {i + 1}
          </h2>

          <div
            key={i}
            className="my-5 space-y-3 first:mt-0 last:mb-0"
          >
            {Array.from({
              length: Math.floor(Math.random() * (30 - 15 + 1)) + 15,
            }).map((_, i, arr) => (
              <div
                key={i}
                style={{
                  width:
                    i + 1 === arr.length
                      ? `${Math.floor(Math.random() * (70 - 10 + 1)) + 10}%`
                      : '100%',
                }}
                className="h-3 rounded bg-muted-5"
              ></div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
