import { DictionaryProvider } from '../../_components/dictionary-provider';
import { getDictionary } from '../../_utils/dictionary';
import { Locales } from '../../_types/dictionary';
import { Form } from '../../_components/form';
import { v4 as uuid } from 'uuid';

interface HomePageProps {
  params: { locale: Locales };
}

const HomePage = async (props: HomePageProps) => {
  const {
    params: { locale },
  } = props;

  const descId = uuid();

  const dictionary = await getDictionary(locale);

  return (
    <DictionaryProvider dictionary={dictionary}>
      <main className="bg-muted-2 min-h-[calc(100vh-64px)] p-5 md:px-8">
        <h1
          aria-describedby={descId}
          className="from-muted-12 to-muted-11 mt-5 text-balance bg-gradient-to-t bg-clip-text text-center text-3xl font-bold text-transparent first-letter:uppercase"
        >
          {dictionary.title}
        </h1>
        <p
          id={descId}
          className="mx-auto mt-3 max-w-lg text-balance text-center text-xl"
        >
          {dictionary.description}
        </p>

        <Form />
      </main>
    </DictionaryProvider>
  );
};

export default HomePage;
