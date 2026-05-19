import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        /* Surface */
        canvas:   "#F8FAFC",
        surface:  "#FFFFFF",
        muted:    "#F1F5F9",
        subtle:   "#E2E8F0",
        hairline: "#CBD5E1",
        mist:     "#94A3B8",

        /* Ink */
        ink: {
          900: "#0F172A",
          800: "#1E293B",
          700: "#334155",
          600: "#475569",
          500: "#64748B",
        },

        /* Brand */
        "safety-blue":       "#2563EB",
        "safety-blue-hover": "#1D4ED8",
        "safety-blue-soft":  "#EFF6FF",
        "deep-navy":         "#0F172A",

        /* Status */
        "alert-red":    "#DC2626",
        "success-green":"#16A34A",

        /* Legacy compat */
        brand: {
          50:  "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
        },
        navy: {
          800: "#1e293b",
          900: "#0f172a",
        },
      },

      fontFamily: {
        sans: ["Pretendard", "var(--font-inter)", "system-ui", "sans-serif"],
      },

      fontSize: {
        heading:      ["1.75rem", { lineHeight: "1.25", fontWeight: "700" }],
        "heading-lg": ["2.5rem",  { lineHeight: "1.2",  fontWeight: "800" }],
        display:      ["3.5rem",  { lineHeight: "1.1",  fontWeight: "800" }],
      },

      borderRadius: {
        sm:   "0.375rem",
        md:   "0.5rem",
        lg:   "0.75rem",
        xl:   "1rem",
        "2xl":"1.5rem",
      },

      boxShadow: {
        card:        "0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)",
        "card-hover":"0 4px 16px rgba(15,23,42,0.10), 0 8px 24px rgba(15,23,42,0.06)",
        elevated:    "0 10px 30px rgba(15,23,42,0.12), 0 20px 40px rgba(15,23,42,0.08)",
        btn:         "0 2px 8px rgba(37,99,235,0.30)",
        focus:       "0 0 0 3px rgba(37,99,235,0.20)",
        /* Legacy */
        soft:        "0 10px 30px rgba(2, 8, 23, 0.08)",
        "soft-lg":   "0 20px 40px rgba(2, 8, 23, 0.1)",
        cta:         "0 12px 28px rgba(37, 99, 235, 0.25)",
        "cta-hover": "0 20px 40px rgba(37, 99, 235, 0.35)",
        glass:       "0 8px 32px rgba(15, 23, 42, 0.08)",
      },

      backgroundImage: {
        "gradient-title": "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #2563eb 100%)",
        "gradient-hero":  "linear-gradient(135deg, #eff6ff 0%, #f8fafc 50%, #fff 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
