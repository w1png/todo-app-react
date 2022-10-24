/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      'bgprimary': '#141414',
      'primary': '#fb4934',
    },
    fontFamily: {
      "primary": ["Noto Serif", "serif"],
    },
    extend: {},
  },
  plugins: ['flowbite/plugin'],
}