/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cmu-red': '#C41230',
        'cmu-red-dark': '#8C0A20',
        'cmu-gray': '#6D6E71',
        'cmu-light-gray': '#E0E0E0',
      }
    },
  },
  plugins: [],
}
