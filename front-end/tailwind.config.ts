import { createColorScale, typeweave } from '@typeweave/plugin';
import { gray, grayDark } from '@radix-ui/colors';
import scrollbar from 'tailwind-scrollbar';
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
    typeweave({
      colorMode: 'rgb',
      themes: {
        light: { colors: { primary: createColorScale(gray) } },
        dark: { colors: { primary: createColorScale(grayDark) } },
      },
    }),
    plugin(({ addVariant }) => {
      addVariant('sc-theme1', '&:is(.sc-theme1 *)');
      addVariant('sc-theme2', '&:is(.sc-theme2 *)');
      addVariant('sc-theme3', '&:is(.sc-theme3 *)');
    }),
    scrollbar({}),
  ],
};

export default config;
