/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      code: ["Source Code Pro", "monospace"],
    },
    extend: {
      colors: {
        green: "#00FD19",
        orange: "#FFC700",
        red: "#FF2C2C",
        blue: "#0076CC",
        "gray-light": "#C8C7C7",
        "gray-medium": "#444444",
        "gray-dark": "#1D1D1D",
        "gray-darker": "#141414",
      },
    },
    screens: {
      md: "1280px",
      sm: "960px",
    },
  },
  plugins: [],
};
