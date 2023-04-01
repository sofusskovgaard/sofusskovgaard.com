module.exports = {
  mode: 'jit',
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['-apple-system', 'Inter', '"Segoe UI"'],
      mono: ['ui-monospace', 'Roboto Mono', 'monospace'],
    },
  },
  variants: {
    extend: {
      borderStyle: ['hover'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
