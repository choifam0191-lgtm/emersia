import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F8FAFC",
        ink: {
          900: "#0f172a",
          800: "#1e293b",
          700: "#334155",
          600: "#475569",
          500: "#64748b"
        },
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af"
        },
        navy: {
          800: "#1e293b",
          900: "#0f172a"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2, 8, 23, 0.08)",
        "soft-lg": "0 20px 40px rgba(2, 8, 23, 0.1)",
        cta: "0 12px 28px rgba(37, 99, 235, 0.25)",
        "cta-hover": "0 20px 40px rgba(37, 99, 235, 0.35)",
        glass: "0 8px 32px rgba(15, 23, 42, 0.08)"
      },
      backgroundImage: {
        "gradient-title":
          "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #2563eb 100%)",
        "gradient-hero": "linear-gradient(135deg, #eff6ff 0%, #f8fafc 50%, #fff 100%)"
      }
    }
  },
  plugins: []
} satisfies Config;
