/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {},
    colors: {
      primary: '#1f1d25',
      secondary: '#1b1b25',
      secondary1: '#9268ed',
      secondary1_50: 'rgba(146,104,237,0.5)',
      white: '#ffffff',
      online: '#00ff21',
      text: '#ccc',
      'background-default-hover': '#f7f7f7',
      'background-hover-primary': '#65646a',
      'photoPicker-overlay-background': 'rgba(205,205,205,0.8)',
    },
    boxShadow: {
      default: 'rgba(100, 100, 111, 0.2) 0 7px 29px 0',
    },
    borderRadius: {
      default: '10px',
      full: '9999px',
    },
  },
  plugins: [],
};
