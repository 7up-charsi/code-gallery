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
      <section className="mx-auto w-full max-w-screen-md rounded bg-background p-5 text-muted-11">
        <h1 className="sr-only">contact form</h1>
        <Form dictionary={dictionary} />
      </section>
    </main>
  );
};

export default HomePage;
