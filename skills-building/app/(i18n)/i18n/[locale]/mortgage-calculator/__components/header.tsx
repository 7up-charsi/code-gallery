'use client';

import {
  ToggleButton,
  ToggleButtonGroup,
} from '@typeweave/react/toggle-button';
import {
  LanguagesIcon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
} from 'lucide-react';
import { PortfolioHeader } from '@/components/portfolio-header';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from '@typeweave/react/skeleton';
import { Combobox } from '@typeweave/react/combobox';
import { Branding } from '@/components/branding';
import { Input } from '@typeweave/react/input';
import { siteConfig } from '../site.config';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import React from 'react';

interface HeaderProps {}

const displayName = 'Header';

const options = [
  { label: 'English', value: 'en-US' },
  { label: 'Portuguese', value: 'pt-PT' },
];

export const Header = (props: HeaderProps) => {
  const {} = props;

  const router = useRouter();

  const { locale } = useParams<{ locale: string }>();

  const { setTheme, theme } = useTheme();

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="">
      <PortfolioHeader />

      <div className="flex items-center gap-3 border-b border-muted-6 bg-background px-5 py-4">
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
                  router.push(
                    `/i18n/${value.value}/mortgage-calculator`,
                  );
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

            <ToggleButtonGroup
              exclusive
              value={theme}
              onChange={(value) => {
                if (value) setTheme(value);
              }}
            >
              <ToggleButton
                isIconOnly
                aria-label="light theme"
                value="light"
              >
                <SunIcon />
              </ToggleButton>

              <ToggleButton
                isIconOnly
                aria-label="dark theme"
                value="dark"
              >
                <MoonIcon />
              </ToggleButton>

              <ToggleButton
                isIconOnly
                aria-label="system theme"
                value="system"
              >
                <MonitorIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </>
        )}
      </div>
    </header>
  );
};

Header.displayName = displayName;
