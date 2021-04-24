module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          // 'prose-lg': {
          //   css: {
          //     lineHeight: '1rem',
          //   },
          // },
          css: {
            h3: {
              marginTop: '0rem',
            },
            a: {
              // textDecoration: 'none',
              fontWeight: '600', // semi-bold
              // '&:hover': {
              //   textDecoration: 'underline',
              // },
            }
          }
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
