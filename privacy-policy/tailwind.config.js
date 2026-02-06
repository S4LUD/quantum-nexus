/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#0b0f1a",
        night: "#0e1118",
      },
      boxShadow: {
        glow: "0 20px 60px rgba(9, 13, 30, 0.35)",
      },
    },
  },
  plugins: [],
};
