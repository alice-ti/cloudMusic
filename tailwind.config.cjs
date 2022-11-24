const mWidthConfig = {
  '1/4': '25%',
  '1/2': '50%',
  '3/5': '60%',
  '3/4': '75%',
}

const keyframesConfig = {
  moveTo: {
    '0%, 100%': { transform: 'translateY(0%)' },
    '50%': { transform: 'translateY(-50%)' },
  },
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,tsx}'],
  theme: {
    extend: {
      minWidth: mWidthConfig,
      maxWidth: mWidthConfig,
      keyframes: keyframesConfig,
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
