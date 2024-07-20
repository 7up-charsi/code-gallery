import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        branding: {
          success: {
            DEFAULT: 'hsl(var(--success) / <alpha-value>)',
            bright: 'hsl(var(--success-bright) / <alpha-value>)',
            dark: 'hsl(var(--success-dark) / <alpha-value>)',
          },
          warning: 'hsl(var(--warning) / <alpha-value>)',
          error: 'hsl(var(--error) / <alpha-value>)',
        },
        gray: {
          900: 'hsl(var(--gray-900) / <alpha-value>)',
          800: 'hsl(var(--gray-800) / <alpha-value>)',
          700: 'hsl(var(--gray-700) / <alpha-value>)',
          600: 'hsl(var(--gray-600) / <alpha-value>)',
          500: 'hsl(var(--gray-500) / <alpha-value>)',
          400: 'hsl(var(--gray-400) / <alpha-value>)',
          300: 'hsl(var(--gray-300) / <alpha-value>)',
          200: 'hsl(var(--gray-200) / <alpha-value>)',
          100: 'hsl(var(--gray-100) / <alpha-value>)',
          50: 'hsl(var(--gray-50) / <alpha-value>)',
        },
        'green-gray': {
          900: 'hsl(var(--green-gray-900) / <alpha-value>)',
          800: 'hsl(var(--green-gray-800) / <alpha-value>)',
          700: 'hsl(var(--green-gray-700) / <alpha-value>)',
          600: 'hsl(var(--green-gray-600) / <alpha-value>)',
          500: 'hsl(var(--green-gray-500) / <alpha-value>)',
          400: 'hsl(var(--green-gray-400) / <alpha-value>)',
          300: 'hsl(var(--green-gray-300) / <alpha-value>)',
          200: 'hsl(var(--green-gray-200) / <alpha-value>)',
          100: 'hsl(var(--green-gray-100) / <alpha-value>)',
          50: 'hsl(var(--green-gray-50) / <alpha-value>)',
        },
      },
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

