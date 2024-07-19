import { lime, limeDark, iris, irisDark } from '@radix-ui/colors';
import { createColorScale, typeweave } from '@typeweave/plugin';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@typeweave/react/dist/**/*.styles.js',
  ],
  theme: {},
  plugins: [
    typeweave({
      themes: {
        light: {
          colors: {
            primary: createColorScale(iris),
            secondary: createColorScale(lime),
          },
        },
        dark: {
          colors: {
            primary: createColorScale(irisDark),
            secondary: createColorScale(limeDark),
          },
        },
      },
    }),
  ],
};

export default config;

