import { typeweave } from '@typeweave/plugin';
import scrollbar from 'tailwind-scrollbar';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@typeweave/react/dist/**/*.styles.js',
  ],
  theme: {},
  plugins: [typeweave(), scrollbar({})],
};

export default config;

