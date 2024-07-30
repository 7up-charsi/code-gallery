import { getDictionary } from './__utils/get-dictionary';
import { Locales } from './__types/dictionary';
import { Form } from './__components/form';

interface HomePageProps {
  params: { locale: Locales };
}

const HomePage = async (props: HomePageProps) => {
  const {
    params: { locale },
  } = props;

  const dictionary = await getDictionary(locale);

  return (
    <main className="">
      <section className="w-full rounded bg-background px-5 py-5 text-muted-11 md:px-10">
        <h1 className="text-2xl font-semibold capitalize">
          {dictionary.title}
        </h1>

        <Form dictionary={dictionary} />
      </section>
    </main>
  );
};

export default HomePage;
