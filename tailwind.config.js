/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,css}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        accent: '#10B981',
        warn: '#F59E0B',
        danger: '#EF4444',
        bg: '#F9FAFB',
        sidebar: '#0B1220',
      },
      borderRadius: {
        xl2: '1rem',
      },
    },
  },
  plugins: [],
}
