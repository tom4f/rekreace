/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        'light-grey': '#ebebeb',
      },
      maxWidth: {
        '724px': '724px',
      },
      width: {
        '724px': '724px',
      },
    },
  },
};
