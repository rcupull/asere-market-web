/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    //eslint-disable-next-line
    require('@tailwindcss/forms'),
    //eslint-disable-next-line
    require('tailwindcss/plugin')(({addUtilities, theme})=>{
      addUtilities({
        '.hyperlink': {
          'color': theme('colors.blue.600'),
          textDecorationLine: 'underline',
        },
        '.hyperlink:visited': {
          'color': theme('colors.purple.600'),
          textDecorationLine: 'underline',
        }
      })
    }),
  ],
}

