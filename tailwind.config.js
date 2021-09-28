module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: 'class',
  theme: {
    colors: {
      california: '#fe9902',
      red: '#f22a42',
      punch: '#db4f25',
    },
    screens: {
      '2xl': {max: '1535px'},
      xl: {max: '1279px'},
      lg: {max: '1023px'},
      md: {max: '767px'},
      sm: {max: '639px'},
    },
  },
  variants: {},
  plugins: [],
};
