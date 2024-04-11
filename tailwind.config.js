/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {},
    colors: {
      primary: '#6318ff',
      'background-default-hover': '#f7f7f7',
      'photopicker-overlay-background': 'rgba(205,205,205,0.8)',
    },
    boxShadow: {
      default: 'rgba(100, 100, 111, 0.2) 0 7px 29px 0',
    },
  },
  plugins: [],
};
