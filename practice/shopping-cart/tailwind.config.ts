import { blackA, tomato, tomatoDark, whiteA } from '@radix-ui/colors';
import { createColorScale, typeweave } from '@typeweave/plugin';
import scrollbar from 'tailwind-scrollbar';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@typeweave/react/dist/**/*.styles.js',
  ],
  plugins: [
    scrollbar({}),
    typeweave({
      themes: {
        light: {
          colors: {
            primary: createColorScale(tomato),
          },
        },
        dark: {
          colors: {
            primary: createColorScale(tomatoDark),
          },
        },
      },
    }),
  ],
};
export default config;

