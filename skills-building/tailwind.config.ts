import { typeweave } from '@typeweave/plugin';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './node_modules/@typeweave/react/dist/**/*.styles.js',
  ],
  theme: {
    extend: {
      colors: {
        // tip calculator
        tc: {
          strong_cyan: 'var(--strong_cyan)',
          very_dark_cyan: 'var(--very_dark_cyan)',
          dark_grayish_cyan: 'var(--dark_grayish_cyan)',
          grayish_cyan: 'var(--grayish_cyan)',
          main_bg: 'var(--main_bg)',
          very_light_grayish_cyan: 'var(--very_light_grayish_cyan)',
          white: 'var(--white)',
        },
      },
    },
  },
  plugins: [
    typeweave(),
    plugin(({ addVariant }) => {
      addVariant('sc-theme1', '&:is(.sc-theme1 *)');
      addVariant('sc-theme2', '&:is(.sc-theme2 *)');
      addVariant('sc-theme3', '&:is(.sc-theme3 *)');
    }),
  ],
};
export default config;

