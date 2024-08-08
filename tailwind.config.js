/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        headingFont: ['var(--font-headingFont)'],
        bodyFont: ['var(--font-bodyFont)']
      },
      backgroundImage: {
        'black-to-navy': 'linear-gradient(to bottom right, #000000, #000080', // custom gradient
      },
    },
  },
  plugins: [require('@tailwindcss/typography', "flowbite/plugin")],
};
