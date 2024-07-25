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
      fontFamily: {
        satoshi: 'var(--satoshi-font)',
        integral: 'var(--integral-font)',
      },
    },
  },
  plugins: [typeweave()],
};

export default config;

