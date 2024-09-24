export default function Home() {
  return (
    <main className="space-y-5 p-5 md:px-8">
      {Array.from({ length: 10 }).map((_, i) => (
        <section
          key={i}
          id={`${i + 1}`}
          className="mb-7 scroll-mt-40 last:mb-0"
        >
          <h2 className="text-2xl font-medium capitalize">
            section {i + 1}
          </h2>

          <div
            key={i}
            className="bg-muted-3 mt-3 h-[70vh] rounded"
          ></div>
        </section>
      ))}
    </main>
  );
}
