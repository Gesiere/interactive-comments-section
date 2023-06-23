/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes:{
        fadeIn: {
          '0%': {opacity: '0'},
          '50%': {opacity: '0.5'},
          '100%': {opacity:'1'}
        }
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in'
      }
      ,
      colors: {
        moderateBlue: 'hsl(238, 40%, 52%)',
        softRed: 'hsl(358, 79%, 66%)',
        lightGrayishBlue: 'hsl(239, 57%, 85%)',
        paleRed: 'hsl(357, 100%, 86%)',
        darkBlue: 'hsl(212, 24%, 26%)',
        grayishBlue: 'hsl(211, 10%, 45%)',
        lightGray: 'hsl(223, 19%, 93%)',
        veryLightGray: 'hsl(228, 33%, 97%)',
        White: 'hsl(0, 0%, 100%)',
      },
    },
    screens: {
      sm: '600px',
      md: '992px',
      lg: '1024px',
      xl: '1200px',
    },
  },
  plugins: [],
}

