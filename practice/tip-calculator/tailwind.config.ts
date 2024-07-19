import { typeweave } from '@typeweave/plugin';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@typeweave/react/dist/**/*.styles.js',
  ],
  theme: {
    extend: {
      colors: {
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
  plugins: [typeweave()],
};

export default config;

