import { Form } from '@/components/form';
import { getDictionary } from '@/utils';
import { Locales } from '@/types';

interface HomePageProps {
  params: { locale: Locales };
}

const HomePage = async (props: HomePageProps) => {
  const {
    params: { locale },
  } = props;

  const dictionary = await getDictionary(locale);

  return (
    <main className="md:mt-5">
      <section className="w-full rounded bg-background px-5 py-5 text-muted-11 md:shadow-md">
        <h1 className="text-2xl font-semibold capitalize">
          {dictionary.title}
        </h1>

        <Form dictionary={dictionary} />
      </section>
    </main>
  );
};

export default HomePage;
