import { createColorScale, typeweave } from '@typeweave/plugin';
import { green, greenDark } from '@radix-ui/colors';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@typeweave/react/dist/**/*.styles.js',
  ],
  theme: {
    extend: {
      fontSize: {
        display1: '72px',
        h1: '56px',
        h2: '48px',
        h3: '40px',
        h4: '36px',
        h5: '32px',
      },
    },
  },
  plugins: [
    typeweave({
      themes: {
        light: { colors: { primary: createColorScale(green) } },
        dark: { colors: { primary: createColorScale(greenDark) } },
      },
    }),
  ],
};
export default config;

