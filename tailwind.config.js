/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "770px",
      lg: "1050px",
      xl: "1280px",
      xlg: "1450px",
    },

    extend: {
      colors: {
        main: "#030F4B",
        second: "#6358DC",
        primary: "#221769",
      },
    },
  },
  plugins: [],
};
