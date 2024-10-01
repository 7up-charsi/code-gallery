import { DictionaryProvider } from '../../_components/dictionary-provider';
import { AppBarContent } from '../../_components/app-bar-content';
import { getDictionary } from '../../_utils/dictionary';
import { AppBar } from '../../_components/app-bar';
import { Locales } from '../../_types/dictionary';

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: Locales };
}

export default async function RootLayout(props: RootLayoutProps) {
  const {
    children,
    params: { locale },
  } = props;

  const dictionary = await getDictionary(locale);

  return (
    <DictionaryProvider dictionary={dictionary}>
      <AppBar>
        <AppBarContent />
      </AppBar>

      {children}
    </DictionaryProvider>
  );
}
