import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Hubballi", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
