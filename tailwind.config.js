/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {},
    colors: {
      primary: '#6318ff',
    },
    boxShadow: {
      default: 'rgba(100, 100, 111, 0.2) 0 7px 29px 0',
    },
  },
  plugins: [],
};
