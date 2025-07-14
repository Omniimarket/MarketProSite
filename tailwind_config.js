// tailwind.config.js
// Configuration for Tailwind CSS.
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './sanity/**/*.{js,ts,jsx,tsx}', // Include Sanity content for Tailwind JIT (if you customize Sanity Studio)
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Add Tailwind Typography plugin for Portable Text rendering
    require('@tailwindcss/aspect-ratio'), // Add this line
  ],
}
