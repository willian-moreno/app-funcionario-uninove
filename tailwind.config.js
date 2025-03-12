/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["OpenSans_400Regular", "sans-serif"],
        bold: ["OpenSans_700Bold", "sans-serif"],
      }
    },
  },
  plugins: [],
}