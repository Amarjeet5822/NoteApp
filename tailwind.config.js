/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        phone: { min: '340px', max: '767px' }, // Smartphone
        tablet: { min: '768px', },    // Tablet
      },
    },
  },
  plugins: [],
}

