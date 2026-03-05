/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111316',
        slate: '#1a1d22',
        mist: '#2a2f36',
        paper: '#efe5d6',
        parchment: '#e8dbc6',
        gold: '#c49a6c',
        sage: '#78927d'
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['Manrope', 'sans-serif'],
        serif: ['Lora', 'serif']
      },
      boxShadow: {
        paper: '0 20px 45px rgba(0,0,0,0.28), inset 0 0 0 1px rgba(0,0,0,0.08)'
      },
      backgroundImage: {
        grain:
          'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.05), transparent 25%), radial-gradient(circle at 80% 0%, rgba(196,154,108,0.06), transparent 30%), linear-gradient(to bottom right, #15181c, #0f1114 60%, #171a1f)'
      }
    }
  },
  plugins: []
};
