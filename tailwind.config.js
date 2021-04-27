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
          css: {
            a: {
              // textDecoration: 'none',
              // color: theme('colors.gray.500'),
              fontWeight: '600', // semi-bold
              // '&:hover': {
              //   textDecoration: 'underline',
              // },
            }
          }
        },
        'xl': {
          css: {
            h3: {
              marginTop: '1em',
              lineHeight: '1.5em',
              fontWeight: '700',
            },
          },
        },
        'lg': {
          css: {
            h3: {
              marginTop: '1em',
              lineHeight: '1.5em',
              fontWeight: '700',
            },
          },
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
