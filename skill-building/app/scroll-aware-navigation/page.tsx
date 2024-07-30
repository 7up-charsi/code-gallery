export default function Home() {
  return (
    <main className="space-y-5 bg-gray-200 p-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <section
          key={i}
          id={`${i + 1}`}
          data-id={i + 1}
          className="h-[70vh] w-full scroll-m-40 content-center rounded bg-white p-5 text-center"
        >
          <h2 className="text-3xl capitalize text-gray-700">
            section {i + 1}
          </h2>
        </section>
      ))}
    </main>
  );
}
