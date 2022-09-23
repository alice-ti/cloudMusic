const minWidthConfig = {
  '1/4': '25%',
  '1/2': '50%',
  '3/4': '75%',
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,tsx}'],
  theme: {
    extend: {
      minWidth: minWidthConfig,
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
