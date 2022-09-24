const mWidthConfig = {
  '1/4': '25%',
  '1/2': '50%',
  '3/5': '60%',
  '3/4': '75%',
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,tsx}'],
  theme: {
    extend: {
      minWidth: mWidthConfig,
      maxWidth: mWidthConfig,
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
