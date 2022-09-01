/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#13131A",
        "dark-light": "#1E1E26",
        "light-dark": "#E2E8F0",
        light: "#FFFFFF",
      },
    },
    animation: {
      "gradient-text": "gradient-text 5s ease infinite",
      "fade-in-up": "fade-in-up 0.5s ease-out",
    },
    keyframes: {
      "gradient-text": {
        "0%, 100%": {
          "background-size": "200% 200%",
          "background-position": "left center",
        },
        "50%": {
          "background-size": "200% 200%",
          "background-position": "right center",
        },
      },
      "fade-in-up": {
        "0%": {
          opacity: "0",
          transform: "translateY(10px)",
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
    },
  },
  plugins: [],
};