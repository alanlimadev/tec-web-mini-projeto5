import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        colors: {
          primary: {
            DEFAULT: '#2563eb',
            dark: '#1d4ed8',
          },
          background: {
            light: '#f9fafb',
            dark: '#111827',
          },
          surface: {
            light: '#ffffff',
            dark: '#1f2937',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
