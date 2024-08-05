'use client';

import {
  ToggleButton,
  ToggleButtonGroup,
} from '@typeweave/react/toggle-button';
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

interface ThemeSwitcherProps {
  className?: string;
}

const displayName = 'ThemeSwitcher';

export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  const { className } = props;

  const { setTheme, theme } = useTheme();

  return (
    <ToggleButtonGroup
      exclusive
      value={theme}
      className={className}
      onChange={(value) => {
        if (value) setTheme(value);
      }}
    >
      <ToggleButton isIconOnly aria-label="light theme" value="light">
        <SunIcon />
      </ToggleButton>

      <ToggleButton isIconOnly aria-label="dark theme" value="dark">
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
  );
};

ThemeSwitcher.displayName = displayName;
