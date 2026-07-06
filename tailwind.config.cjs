/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  },
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#0f172a',
        },
      },
    },
  },
  plugins: [],
};