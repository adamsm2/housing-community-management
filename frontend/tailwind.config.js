/** @type {import("tailwindcss").Config} */
export default {
  purge: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        primaryHover: "rgb(var(--color-primary-hover) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        secondaryHover: "rgb(var(--color-secondary-hover) / <alpha-value>)",
        bkg: "rgb(var(--color-bkg) / <alpha-value>)",
        textTitle: "rgb(var(--color-text-title) / <alpha-value>)",
        textContent: "rgb(var(--color-text-content) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

