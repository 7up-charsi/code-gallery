'use client';

import { useTheme } from 'next-themes';
import React from 'react';

interface HeaderProps {}

const displayName = 'Header';

export const Header = (props: HeaderProps) => {
  const {} = props;

  const { setTheme, theme } = useTheme();

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="flex h-10 w-full items-center">
      <h1 className="font-bold">Calculator</h1>
      <div className="grow"></div>

      {isMounted && (
        <div className="relative flex h-4 w-12 rounded-full bg-toggle_keypad_bg">
          <div
            data-theme1={theme === 'theme1'}
            data-theme2={theme === 'theme2'}
            data-theme3={theme === 'theme3'}
            className="pointer-events-none absolute top-1/2 aspect-square h-3 -translate-y-1/2 rounded-full bg-equal_toggleIndicator_bg data-[theme1=true]:left-[3px] data-[theme2=true]:left-1/2 data-[theme3=true]:right-[3px] data-[theme2=true]:-translate-x-1/2"
          ></div>

          <div className="absolute inset-0 flex">
            <button
              className="relative h-full grow appearance-none rounded-l-full outline-none before:absolute before:-top-[calc(100%+5px)] before:left-1/2 before:-translate-x-1/2 before:content-['1'] focus-visible:ring-2"
              onClick={() => {
                setTheme('theme1');
              }}
            ></button>
            <button
              className="relative h-full grow appearance-none outline-none before:absolute before:-top-[calc(100%+5px)] before:left-1/2 before:-translate-x-1/2 before:content-['2'] focus-visible:ring-2"
              onClick={() => {
                setTheme('theme2');
              }}
            ></button>
            <button
              className="relative h-full grow appearance-none rounded-r-full outline-none before:absolute before:-top-[calc(100%+5px)] before:left-1/2 before:-translate-x-1/2 before:content-['3'] focus-visible:ring-2"
              onClick={() => {
                setTheme('theme3');
              }}
            ></button>
          </div>
        </div>
      )}
    </header>
  );
};

Header.displayName = displayName;
