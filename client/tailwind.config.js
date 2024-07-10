const { defaultTheme } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cynomi-blue': '#007ace',
        'button-blue': '#0056b3',
        'button-hover-blue': '#004494',
      },
      // fontFamily: {
      //   sans: ['Inter', ...defaultTheme.fontFamily.sans], // Spread operator to merge with default fonts
      // },
    },
  },
  plugins: [],
};
