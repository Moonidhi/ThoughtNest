/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"] ,
  theme: {
    extend: {
      colors: {
        ink: "#151312",
        panel: "#1e1a17",
        parchment: "#e8e2d8",
        muted: "#b9b1a3",
        gold: "#b89c5d",
        "line-muted": "rgba(232,226,216,0.1)",
        "accent-navy": "#1b2430",
        "accent-burgundy": "#3a1f2b",
        "accent-forest": "#1c2a24"
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Iowan Old Style", "Garamond", "Times New Roman", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 40px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};
