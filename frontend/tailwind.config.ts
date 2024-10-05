// frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60A5FA', // Light Blue
          DEFAULT: '#3B82F6', // Blue
          dark: '#1E40AF', // Dark Blue
        },
        secondary: {
          light: '#D1D5DB', // Light Gray
          DEFAULT: '#9CA3AF', // Gray
          dark: '#4B5563', // Dark Gray
        },
        accent: {
          light: '#F472B6', // Light Pink
          DEFAULT: '#EC4899', // Pink
          dark: '#DB2777', // Dark Pink
        },
      },
    },
  },
  plugins: [],
};
