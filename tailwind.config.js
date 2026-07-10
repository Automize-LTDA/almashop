/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'alma-black': '#050505',
        'alma-dark': '#0a0a0a',
        'alma-gray': '#1a1a1a',
        'alma-light': '#f0f0f0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Oswald', 'sans-serif'], // For the aggressive condensed typography
        logo: ['Anton', 'sans-serif'], // For the chunky brand logo
      },
      animation: {
        'glitch': 'glitch 2s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glitch: {
          '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
          '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
          '62%': { transform: 'translate(0,0) skew(5deg)' },
        }
      }
    },
  },
  plugins: [],
}
