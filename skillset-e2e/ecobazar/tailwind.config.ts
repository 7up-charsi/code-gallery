import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
  plugins: [],
};
export default config;

