import { DictionaryProvider } from './__components/dictionary-provider';
import { getDictionary } from './__utils/dictionary';
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
    <DictionaryProvider dictionary={dictionary}>
      <main className="flex min-h-[calc(100vh-105px)] items-center justify-center md:p-8">
        <h1 className="sr-only">contact form</h1>

        <Form />
      </main>
    </DictionaryProvider>
  );
};

export default HomePage;
