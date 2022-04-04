module.exports = {
  purge: [
    './pages/**/*.js',
    './pages/**/*.ts',
    './pages/**/*.jsx',
    './pages/**/*.tsx',
    './components/**/*.js',
    './components/**/*.ts',
    './components/**/*.jsx',
    './components/**/*.tsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'almost-black': '#14171A',
        youtube: '#FF0000',
        twitter: '#1DA1F2',
        github: '#9CDAF1',
        'hacker-news': '#FF6600',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
