import { typeweave } from '@typeweave/plugin';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    '../node_modules/@typeweave/react/dist/**/*.styles.js',
    '../node_modules/@repo/ui/src/*.tsx',
  ],
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
