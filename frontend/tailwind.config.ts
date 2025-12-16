/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0671EA',
        secondary: '#C5DDF5',
        background: '#F5F5F5',
        surface: '#FFFFFF',
      }
    },
  },
  plugins: [],
}
