/** @type {import('tailwindcss').Config} */
import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: [
    "./web/src/index.html",
    "./web/src/**/*.{js,ts,jsx,tsx}",
    "./web/src/**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
