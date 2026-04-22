/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'b-blue':    '#5170FF',
        'b-blue-lt': '#828AFF',
        'b-coral':   '#FF6D4D',
        'b-cyan':    '#41EAFF',
        'b-dark':    '#00031F',
        'b-dark2':   '#020425',
        'b-light':   '#F8F7F4',
        'b-light2':  '#EEF1FF',
      },
      fontFamily: {
        cal:  ['"Cal Sans"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
