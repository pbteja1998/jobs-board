module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'accent-1': '#333',
        'cyan-1': 'hsl(180, 52%, 96%)',
        'cyan-2': 'hsl(180, 31%, 95%)',
        'cyan-3': 'hsl(180, 8%, 52%)',
        'cyan-4': 'hsl(180, 14%, 20%)',
      },
    },
  },
  variants: {},
  plugins: [],
}
