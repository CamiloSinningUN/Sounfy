/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', 'playlist.html'],
  theme: {
    extend: {
    },
    colors: {
      'gray': "#191919",
      'orange': "#FF5964",
      'white': "#FFFFFF",
      'blue': "#35A6FF",
      'yellow': "#FFFF00",
      'black': "#000000", 
      'gray-2': "#222222",
      'sky-500': "#00B4D8",
      'indigo-500': "#6610f2",
    },
    fontFamily: {
      'Reem-Kufi': ['"Reem Kufi"', 'sans-serif'],
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
