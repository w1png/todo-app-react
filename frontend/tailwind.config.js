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
      'bgsecondary': '#292929',
      'primary': '#A2DEBD',
      'secondary': '#93CAAC',
      'accent': '#5B7969'
    },
    fontFamily: {
      'primary': ['VT323', 'monospace'],
      'secondary': ['Oswald', 'sans-serif'],
    },
    extend: {},
  },
  plugins: ['flowbite/plugin'],
}