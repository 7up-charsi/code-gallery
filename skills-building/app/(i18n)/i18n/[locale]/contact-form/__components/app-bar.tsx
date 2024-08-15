'use client';

import { PortfolioHeader } from '@/components/portfolio-header';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { useParams, useRouter } from 'next/navigation';
import { Combobox } from '@typeweave/react/combobox';
import { Skeleton } from '@typeweave/react/skeleton';
import { Branding } from '@/components/branding';
import { Input } from '@typeweave/react/input';
import { LanguagesIcon } from 'lucide-react';
import { siteConfig } from '../site.config';
import React from 'react';

interface AppBarProps {}

const displayName = 'AppBar';

const options = [
  { label: 'English', value: 'en-US' },
  { label: 'Portuguese', value: 'pt-PT' },
];

export const AppBar = (props: AppBarProps) => {
  const {} = props;

  const router = useRouter();

  const { locale } = useParams<{ locale: string }>();

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="">
      <PortfolioHeader />

      <div className="flex h-16 items-center gap-3 border-b border-muted-6 bg-background px-5 md:px-10">
        <Branding href={siteConfig.pathname}>
          {siteConfig.name}
        </Branding>

        <div className="grow"></div>

        {!isMounted && (
          <>
            <Skeleton variant="rounded" className="h-9 w-40" />
            <Skeleton variant="rounded" className="h-9 w-20" />
          </>
        )}

        {isMounted && (
          <>
            <Combobox
              value={options.find((opt) => opt.value === locale)}
              options={options}
              disableClearable
              onChange={(value, reason) => {
                if (reason === 'selectOption') {
                  router.push(`/i18n/${value.value}/contact-form`);
                }
              }}
              renderInput={(props) => (
                <Input
                  label="select locale"
                  hideLabel
                  {...props}
                  classNames={{
                    ...props.classNames,
                    inputWrapper: 'h-9',
                  }}
                  startContent={<LanguagesIcon />}
                  className="w-40"
                />
              )}
            />
          </>
        )}

        <ThemeSwitcher />
      </div>
    </header>
  );
};

AppBar.displayName = displayName;
