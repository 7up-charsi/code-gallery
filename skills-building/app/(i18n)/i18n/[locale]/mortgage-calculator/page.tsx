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
      <main className="grid grid-cols-1 overflow-hidden bg-background md:grid-cols-2">
        <Form />
      </main>
    </DictionaryProvider>
  );
};

export default HomePage;
