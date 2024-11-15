import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "415px",
      "2xl": "1400px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif", ...defaultTheme.fontFamily.sans],
      },
      aspectRatio: {
        "3/2": "3/2",
        "25/9": "25/9",
        "11/2": "11/2",
      },
    },
  },
  plugins: [],
};
