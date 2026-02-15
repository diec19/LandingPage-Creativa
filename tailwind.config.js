/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Colores principales de Ilusión Creativa
        turquoise: {
          50: '#e6f7f7',
          100: '#b3e8e8',
          200: '#80d9d9',
          300: '#4dcaca',
          400: '#33c2c2',
          500: '#1ab5b5', // Color principal turquesa
          600: '#159999',
          700: '#107d7d',
          800: '#0b6161',
          900: '#064545',
        },
        'pastel-yellow': {
          50: '#fffef5',
          100: '#fffbe6',
          200: '#fff8cc',
          300: '#fff4b3',
          400: '#fff199',
          500: '#ffed80', // Amarillo pastel principal
          600: '#f5d666',
          700: '#d9b84d',
          800: '#bf9b33',
          900: '#a67d1a',
        },
        'soft-pink': {
          50: '#fff5f9',
          100: '#ffe6f0',
          200: '#ffc2dc',
          300: '#ff9ec8',
          400: '#ff7ab4',
          500: '#ff5fa0', // Rosa suave principal
          600: '#e64d8a',
          700: '#cc3b74',
          800: '#b3295e',
          900: '#991748',
        },
        'cream': {
          50: '#fefdfb',
          100: '#fdfbf7',
          200: '#fbf7ef',
          300: '#f9f3e7',
          400: '#f7efdf',
          500: '#f5ebd7', // Crema/beige de las etiquetas
        },
        // Colores del logo original
        'logo-green': {
          DEFAULT: '#a3d977', // Verde lima de "Ilusión"
          light: '#b8e592',
          dark: '#8ec45c',
        },
        'logo-purple': {
          DEFAULT: '#9b6bb5', // Morado de "Creativa"
          light: '#b085ca',
          dark: '#8657a0',
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        rounded: ['Quicksand', 'Poppins', 'Nunito', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(-50%)' },
          '50%': { transform: 'translateY(-8px) translateX(-50%)' },
        }
      },
    },
  },
  plugins: [],
}
