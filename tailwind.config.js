/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["-apple-system", "Inter", '"Segoe UI"'],
      mono: ["ui-monospace", "Roboto Mono", "monospace"],
    },
    screens: {
      "xxs": "384px",
      "xs": "512px",
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px",
    },
  },
  variants: {
    extend: {
      borderStyle: ["hover"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
