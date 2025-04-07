// tailwind.config.js
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primaryGreen: "#4ac45f",
          accentOrange: "#f42c04",
          secondaryGreen: "#44af69",
          white: "#ffffff",
          black: "#000000",
        },
      },
    },
    plugins: [],
  }
  