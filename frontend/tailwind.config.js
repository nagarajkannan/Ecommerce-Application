/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        electrolize: ["Electrolize", "sans-serif"],
        orbitron:["Orbitron"],
        crimson:["Crimson"],
      },
    },
  },
  plugins: [],
}
