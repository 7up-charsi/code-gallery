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
      <main className="grid grid-cols-1 overflow-hidden bg-background md:mt-5 md:grid-cols-2 md:grid-rows-[70px_auto] md:rounded md:shadow-md">
        <h1 className="mx-5 mt-5 text-2xl font-semibold capitalize">
          {dictionary.title}
        </h1>

        <Form />
      </main>
    </DictionaryProvider>
  );
};

export default HomePage;