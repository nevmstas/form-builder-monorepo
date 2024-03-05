/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: {
        DEFAULT: "#f25c54",
        contrast: "white",
        light: "#f27059",
      },
      secondary: {
        default: "#white",
        contrast: "f25c54",
        light: "#aacc00",
      },
      error: {
        default: "#c81d25",
        light: "#ff5a5f",
      },
    },
    extend: {},
  },
  plugins: [],
};
