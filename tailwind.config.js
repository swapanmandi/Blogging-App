/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      "xs": "320px",
      "lg": "1024px"
    },
    extend: {
      keyframes:{
        swipeRight:{
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation:{
        swipeRight: 'swipeRight 0.5s ease-out forwards',
      }
    },
  },
  
  plugins: [],
}

