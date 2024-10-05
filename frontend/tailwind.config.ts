// frontend/tailwind.config.js

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',   // Example primary color
        secondary: '#3B82F6', // Example secondary color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
