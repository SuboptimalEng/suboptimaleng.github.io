module.exports = {
  content: [
    './public/**/*.html',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
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
  plugins: [],
};
