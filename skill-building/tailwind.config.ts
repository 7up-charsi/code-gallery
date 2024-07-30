import { typeweave } from '@typeweave/plugin';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './node_modules/@typeweave/react/dist/**/*.styles.js',
  ],
  theme: {
    extend: {
      colors: {
        sc: {
          yellowText: 'var(--yellowText)',
          whiteText: 'var(--whiteText)',
          darkBlueText: 'var(--darkBlueText)',
          main_bg: 'var(--main_bg)',
          toggle_keypad_bg: 'var(--toggle_keypad_bg)',
          screen_bg: 'var(--screen_bg)',
          del_reset_bg: 'var(--del_reset_bg)',
          del_reset_bg_shadow: 'var(--del_reset_bg_shadow)',
          equal_toggleIndicator_bg: 'var(--equal_toggleIndicator_bg)',
          equal_shadow: 'var(--equal_shadow)',
          key_bg: 'var(--key_bg)',
          keyShadow: 'var(--keyShadow)',
        },
      },
    },
  },
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

