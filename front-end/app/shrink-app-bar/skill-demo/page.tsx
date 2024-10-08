export default function Page() {
  return (
    <main className="bg-muted-2 min-h-[clac(100vh-80px)] p-5 pt-[105px] md:px-8">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="my-5 space-y-3 first:mt-0 last:mb-0">
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
    </main>
  );
}
