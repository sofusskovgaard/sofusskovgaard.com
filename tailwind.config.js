module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: false, // or 'media' or 'class'
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
