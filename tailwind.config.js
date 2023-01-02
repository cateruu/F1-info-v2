/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        show: {
          '0%': { right: '-100%' },
          '100%': { right: '0' },
        },
      },
      animation: {
        show: 'show 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
