/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'loginbg': "url('/assets/images/loginbg.jpg')",
      }
    },
  },
  plugins: [],
}