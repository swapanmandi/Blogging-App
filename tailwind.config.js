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
    extend: {},
  },
  plugins: [],
}

