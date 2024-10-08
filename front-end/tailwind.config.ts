import { createColorScale, typeweave } from '@typeweave/plugin';
import { gray, grayDark } from '@radix-ui/colors';
import scrollbar from 'tailwind-scrollbar';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    '../node_modules/@typeweave/react/dist/**/*.styles.js',
    '../node_modules/@repo/ui/src/**/*.tsx',
  ],
  theme: {
    extend: {
      animation: {
        'blink-cursor':
          'blink-cursor var(--cursor-blinking-duration) cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'blink-cursor': {
          '50%': {
            opacity: '0.5',
          },
        },
      },
    },
  },
  plugins: [
    typeweave({
      colorMode: 'rgb',
      themes: {
        light: { colors: { primary: createColorScale(gray) } },
        dark: { colors: { primary: createColorScale(grayDark) } },
      },
    }),
    plugin(({ addVariant }) => {
      addVariant('sc-theme1', '&:is(.sc-theme1 *)');
      addVariant('sc-theme2', '&:is(.sc-theme2 *)');
      addVariant('sc-theme3', '&:is(.sc-theme3 *)');
    }),
    scrollbar({}),
  ],
};

export default config;
