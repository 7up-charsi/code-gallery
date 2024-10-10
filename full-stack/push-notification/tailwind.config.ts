import { createColorScale, typeweave } from '@typeweave/plugin';
import { gray, grayDark } from '@radix-ui/colors';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../node_modules/@typeweave/react/dist/**/*.styles.js',
    '../../node_modules/@repo/ui/src/**/*.tsx',
  ],
  plugins: [
    typeweave({
      colorMode: 'rgb',
      themes: {
        light: { colors: { primary: createColorScale(gray) } },
        dark: { colors: { primary: createColorScale(grayDark) } },
      },
    }),
  ],
};

export default config;
