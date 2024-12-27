/** @type {import('tailwindcss').Config} */

// const flowbit = require("flowbite-react/tailwind")

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // flowbit.content()
  ],
  theme: {
    extend: {
      backgroundImage: {
        'loginbg': "url('/assets/images/loginbg.jpg')",
      },
    },
  },
  plugins: [
    // flowbit.plugin()
  ],
}