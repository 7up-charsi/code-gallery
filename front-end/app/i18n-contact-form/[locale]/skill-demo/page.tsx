import { getDictionary } from '../../_utils/get-dictionary';
import { Locales } from '../../_types/dictionary';
import { Form } from '../../_components/form';

interface HomePageProps {
  params: { locale: Locales };
}

const HomePage = async (props: HomePageProps) => {
  const {
    params: { locale },
  } = props;

  const dictionary = await getDictionary(locale);

  return (
    <main className="flex min-h-[calc(100vh-105px)] items-center justify-center md:p-8">
      <h1 className="sr-only">contact form</h1>
      <Form dictionary={dictionary} />
    </main>
  );
};

export default HomePage;
