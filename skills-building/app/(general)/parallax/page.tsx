import { Section1 } from './__components/section-1';
import { Section3 } from './__components/section-3';

export default function Home() {
  return (
    <main className="">
      <Section1 />

      <section className="bg-background p-5">
        <div className="mx-auto max-w-lg">
          <h2 className="text-muted-12 text-center text-2xl font-medium capitalize">
            Dummy Heading 1
          </h2>

          <p className="mt-2 text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequatur optio exercitationem odit quibusdam, magni
            quasi, quae, esse animi dolorum quod in voluptatum. Ullam
            quibusdam veritatis alias voluptas optio? Rem atque dicta
            impedit excepturi ex iusto tempore ipsam aperiam?
            Voluptates vero nam veritatis blanditiis officiis error
            ipsam, modi, natus ullam ipsum ab at quam nisi. Amet
            magnam eius molestias maiores obcaecati a corrupti sed
            commodi ipsa distinctio fugit itaque, delectus architecto
            necessitatibus aliquid quasi corporis dolore ut, non,
            facere eaque cupiditate! Nulla autem aliquam quam nobis
            eligendi modi. Labore ab, illo quia voluptate ea dolore
            assumenda totam, itaque, fuga suscipit soluta.
          </p>

          <h2 className="text-muted-12 mt-5 text-center text-2xl font-medium capitalize">
            Dummy Heading 2
          </h2>

          <p className="mt-2 text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequatur optio exercitationem odit quibusdam, magni
            quasi, quae, esse animi dolorum quod in voluptatum. Ullam
            quibusdam veritatis alias voluptas optio? Rem atque dicta
            impedit excepturi ex iusto tempore ipsam aperiam?
            Voluptates vero nam veritatis blanditiis officiis error
            ipsam, modi, natus ullam ipsum ab at quam nisi. Amet
            magnam eius molestias maiores obcaecati a corrupti sed
            commodi ipsa distinctio fugit itaque, delectus architecto
            necessitatibus aliquid quasi corporis dolore ut, non,
            facere eaque cupiditate! Nulla autem aliquam quam nobis
            eligendi modi. Labore ab, illo quia voluptate ea dolore
            assumenda totam, itaque, fuga suscipit soluta.
          </p>
        </div>
      </section>

      <Section3 />
    </main>
  );
}
