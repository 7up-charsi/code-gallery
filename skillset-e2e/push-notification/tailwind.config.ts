import type { Config } from 'tailwindcss';
import { typeweave } from '@typeweave/plugin';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../..//node_modules/@typeweave/react/dist/**/*.styles.js',
  ],
  plugins: [typeweave()],
};

export default config;

