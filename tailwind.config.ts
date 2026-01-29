import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0b1220",
          700: "#1f2a44",
          500: "#334155"
        },
        brand: {
          600: "#2563eb",
          700: "#1d4ed8"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2, 8, 23, 0.08)"
      }
    }
  },
  plugins: []
} satisfies Config;

