/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      // Colors are now defined in src/input.css using Tailwind v4.1 @theme directive
      // This provides better performance and consistency with CSS variables
      
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'skeleton-pulse': 'skeleton-pulse 1.5s ease-in-out infinite',
        'toast-enter': 'toast-enter 300ms ease-out',
        'toast-exit': 'toast-exit 200ms ease-in',
      },
      keyframes: {
        'skeleton-pulse': {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
        'toast-enter': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'toast-exit': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
      boxShadow: {
        // Using modern rgb() syntax with space separation
        'float': '0 10px 30px -10px rgb(0 0 0 / 0.25)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}