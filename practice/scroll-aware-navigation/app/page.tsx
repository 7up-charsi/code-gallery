export default function Home() {
  return (
    <main className="">
      {Array.from({ length: 10 }).map((_, i) => (
        <section
          key={i}
          id={`${i + 1}`}
          data-id={i + 1}
          className="w-full scroll-m-40 p-5 data-[id=10]:bg-amber-100 data-[id=1]:bg-pink-100 data-[id=2]:bg-indigo-100 data-[id=3]:bg-violet-100 data-[id=4]:bg-red-100 data-[id=5]:bg-yellow-100 data-[id=6]:bg-sky-100 data-[id=7]:bg-emerald-100 data-[id=8]:bg-cyan-100 data-[id=9]:bg-teal-100"
        >
          <h2 className="text-3xl capitalize text-gray-700">
            section {i + 1}
          </h2>

          <p className="mt-3 text-balance text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Sequi eligendi dignissimos incidunt nulla architecto! Rem,
            facere vero sint illum fugit eos ducimus. Sed, expedita,
            eligendi accusantium eum fugiat obcaecati enim iste
            magnam, laudantium ea deserunt quam repellat nam ullam
            atque pariatur dolore accusamus consequuntur corrupti
            voluptatum? Culpa reprehenderit quidem impedit illum rem,
            praesentium est nulla, sint mollitia repudiandae nisi
            exercitationem facilis, molestias laudantium officia? Est
            atque sint quam repellendus pariatur quibusdam doloremque
            commodi molestiae, culpa debitis eaque qui hic neque earum
            incidunt vel mollitia voluptate quaerat laborum asperiores
            iure tempore natus? Maxime, optio laudantium accusamus
            incidunt minus dolorem totam nemo minima deserunt corporis
            tempore recusandae ipsum cumque quia doloribus? Quos,
            voluptate! Nobis rerum a praesentium nam tempore rem fugit
            officiis explicabo asperiores consequuntur, optio cum
            autem accusamus tenetur, voluptatibus assumenda sit
            incidunt id dolor provident natus voluptatum. Ex, totam
            tempore dolorem eaque, consectetur aliquid corporis odio
            odit doloribus laboriosam quam?
          </p>
        </section>
      ))}
    </main>
  );
}
