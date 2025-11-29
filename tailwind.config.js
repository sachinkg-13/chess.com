/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "chess-board-light": "#f0d9b5",
        "chess-board-dark": "#b58863",
        "sidebar-bg": "#262421",
        "sidebar-hover": "#3d3b38",
      },
    },
  },
  plugins: [],
};
