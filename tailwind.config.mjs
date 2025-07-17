/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cosmic: {
          purple: '#6B46C1',
          darkPurple: '#1E1B4B',
          blue: '#2563EB',
          pink: '#EC4899',
          cyan: '#06B6D4',
          glow: '#00F5FF',
        },
        mushroom: {
          biolume: '#00FF94',
          cap: '#FF6B6B',
          stem: '#FFF4E6',
        },
        metal: {
          black: '#0A0A0A',
          silver: '#E5E7EB',
          chrome: '#C0C0C0',
        }
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #1E1B4B 0%, #2563EB 50%, #EC4899 100%)',
        'aurora': 'linear-gradient(45deg, #00F5FF, #FF00FF, #00FF94)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'spore': 'spore 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
        spore: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { transform: 'translateY(-100vh) rotate(360deg)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}