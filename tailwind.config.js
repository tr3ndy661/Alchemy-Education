/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(10deg)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        }
      },
      animation: {
        'float-slow': 'float-slow 8s ease-in-out infinite',
        slideIn: 'slideIn 0.3s ease-out forwards',
      },
      boxShadow: {
        'custom': '0 4px 0px 0px rgba(0, 0, 0, 0.1)',
        'custom2': '0 10px 10px 10px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

