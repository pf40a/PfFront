/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Primary: '#152430',
        Secondary: '#FCCF8D',
        customLightBlue: '#299FFF',
        customDarkBlue: '#0F8CF2',
        customOrange: '#A66500',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}