/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        syndic: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b9e0ff',
          300: '#7cc7ff',
          400: '#36acff',
          500: '#0c93f1',
          600: '#0074ce',
          700: '#005ca6',
          800: '#004e89',
          900: '#2B4C8C',
          950: '#1a2e54',
        }
      },
      fontFamily: {
        'arabic': ['Cairo', 'Noto Sans Arabic', '-apple-system', 'system-ui', 'sans-serif'],
        'latin': ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [],
};