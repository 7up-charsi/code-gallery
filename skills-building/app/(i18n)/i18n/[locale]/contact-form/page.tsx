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
    <main className="mx-auto max-w-screen-md p-5 md:px-8">
      <h1 className="sr-only">contact form</h1>
      <Form dictionary={dictionary} />
    </main>
  );
};

export default HomePage;
