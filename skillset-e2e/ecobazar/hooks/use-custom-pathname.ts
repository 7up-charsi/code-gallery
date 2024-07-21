import { useParams, usePathname } from 'next/navigation';
import { Locales } from '@/types/dictionary';

export const useCustomPathname = () => {
  const pathname = usePathname();
  const { locale } = useParams<{ locale: Locales }>();

  return pathname.slice(locale.length + 1) || '/';
};
