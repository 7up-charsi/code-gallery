import { createColorScale, typeweave } from '@typeweave/plugin';
import { mauve, mauveDark } from '@radix-ui/colors';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@typeweave/react/dist/**/*.styles.js',
  ],
  plugins: [
    typeweave({
      themes: {
        light: {
          colors: {
            muted: createColorScale(mauve),
          },
        },
        dark: {
          colors: {
            muted: createColorScale(mauveDark),
            background: mauveDark.mauve1,
          },
        },
      },
    }),
  ],
};
export default config;

