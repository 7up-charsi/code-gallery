import type { Config } from 'tailwindcss';
import { typeweave } from '@typeweave/plugin';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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

