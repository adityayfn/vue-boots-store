/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        100: "25rem",
        112: "36rem",
      },
      height: {
        46: "160px",
        68: "265px",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [require("daisyui")],
}
