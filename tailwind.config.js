/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.{html,js}"],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              fontSize: theme('fontSize.2xl'),
              fontWeight: theme('fontWeight.bold'),
              color: "white",
            },
            h2: {
              fontSize: theme('fontSize.xl'),
              fontWeight: theme('fontWeight.semibold'),
              color: "white",
            },
            h3: {
              color: "white"
            },
            h4: {
              color: "white"
            },
            h5: {
              color: "white"
            },
            h6: {
              color: "white"
            },
            strong: {
              color: "white",
            },
            code: {
              color: "white"
            },
            a: {
              color: "white"
            },
            li: {
              color: "white"
            },
            ul: {
              color: "white"
            },
            p: {
              color: "white"
            }
            // Add more styles as needed
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

