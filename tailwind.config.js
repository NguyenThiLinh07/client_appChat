/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {},
    colors: {
      primary: '#1f1d25',
      secondary: '#1b1b25',
      secondary1: '#9268ed',
      white: '#ffffff',
      'background-default-hover': '#f7f7f7',
      'photopicker-overlay-background': 'rgba(205,205,205,0.8)',
    },
    boxShadow: {
      default: 'rgba(100, 100, 111, 0.2) 0 7px 29px 0',
    },
    borderRadius: {
      default: '10px',
    },
  },
  plugins: [],
};
