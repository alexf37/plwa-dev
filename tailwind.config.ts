import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: [
    "./web/src/**/*.{html,js,ts,jsx,tsx}",
    "./web/public/**/*.{html,php,js,ts,jsx,tsx}",
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
