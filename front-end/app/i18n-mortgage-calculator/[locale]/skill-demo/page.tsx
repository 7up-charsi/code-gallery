import { DictionaryProvider } from '../../_components/dictionary-provider';
import { getDictionary } from '../../_utils/dictionary';
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
    <DictionaryProvider dictionary={dictionary}>
      <main className="flex min-h-[calc(100vh-105px)] items-center justify-center md:p-8">
        <h1 className="sr-only">mortgage calculator</h1>

        <Form />
      </main>
    </DictionaryProvider>
  );
};

export default HomePage;
