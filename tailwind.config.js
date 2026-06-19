/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          900: '#0a0a0a',
          800: '#121212',
          700: '#1a1a1a',
        },
        gold: {
          400: '#ffd700',
          500: '#ffb700',
          600: '#e6a500',
          glow: 'rgba(255, 215, 0, 0.5)',
        },
        purple: {
          400: '#a855f7',
          500: '#9333ea',
          600: '#7c3aed',
          glow: 'rgba(168, 85, 247, 0.5)',
        },
        neon: {
          gold: '#ffd700',
          purple: '#a855f7',
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'chest-open': 'chest-open 0.8s ease-out forwards',
        'lightning': 'lightning 0.1s ease-in-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 215, 0, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'chest-open': {
          '0%': { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(-110deg)' },
        },
        'lightning': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
