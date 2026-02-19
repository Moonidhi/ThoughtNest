/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"] ,
  theme: {
    extend: {
      colors: {
        ink: "#161412",
        panel: "#1f1b17",
        parchment: "#e6dfd5",
        muted: "#b8aea2",
        gold: "#b89c5d",
        "line-muted": "rgba(230,223,213,0.1)",
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
