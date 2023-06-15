/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        moderateBlue: 'hsl(238, 40%, 52%)',
        softRed: 'hsl(358, 79%, 66%)',
        lightGrayishBlue: 'hsl(239, 57%, 85%)',
        paleRed: 'hsl(357, 100%, 86%)',
        darkBlue: 'hsl(212, 24%, 26%)',
        grayishBlue: 'hsl(211, 10%, 45%)',
        lightGray: '',
        veryLightGray:'hsl(228, 33%, 97%)',
        White: 'hsl(0, 0%, 100%)',
      },
    },
    screens: {
      sm: '768px',
      md: '992px',
      lg: '1024px',
      xl: '1200px',
    },
  },
  plugins: [],
}

