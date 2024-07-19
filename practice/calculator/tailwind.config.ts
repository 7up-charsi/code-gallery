import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
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
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('theme1', '&:is(.theme1 *)');
      addVariant('theme2', '&:is(.theme2 *)');
      addVariant('theme3', '&:is(.theme3 *)');
    }),
  ],
};

export default config;

