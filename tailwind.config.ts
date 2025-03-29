import theme from './src/config/theme';

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: theme.colors,
      fontFamily: theme.fonts,
      fontSize: theme.fontSizes,
      spacing: theme.spacing,
      borderRadius: theme.borderRadius,
      boxShadow: theme.boxShadow,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
