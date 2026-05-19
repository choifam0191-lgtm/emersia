import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        /* Surface tokens */
        canvas:   "var(--color-canvas)",
        surface:  "var(--color-surface)",
        muted:    "var(--color-muted)",
        subtle:   "var(--color-subtle)",
        hairline: "var(--color-hairline)",
        mist:     "var(--color-mist)",

        /* Ink tokens */
        ink: {
          900: "var(--color-ink-900)",
          800: "var(--color-ink-800)",
          700: "var(--color-ink-700)",
          600: "var(--color-ink-600)",
          500: "var(--color-ink-500)",
        },

        /* Brand tokens */
        "safety-blue":      "var(--color-safety-blue)",
        "safety-blue-hover":"var(--color-safety-blue-hover)",
        "safety-blue-soft": "var(--color-safety-blue-soft)",
        "deep-navy":        "var(--color-deep-navy)",

        /* Status tokens */
        "alert-red":    "var(--color-alert-red)",
        "success-green":"var(--color-success-green)",

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
        sans: ["Pretendard", "Inter", "system-ui", "sans-serif"],
      },

      fontSize: {
        heading:    ["1.75rem", { lineHeight: "1.25", fontWeight: "700" }],
        "heading-lg": ["2.5rem",  { lineHeight: "1.2",  fontWeight: "800" }],
        display:    ["3.5rem",  { lineHeight: "1.1",  fontWeight: "800" }],
      },

      borderRadius: {
        sm:  "var(--radius-sm)",
        md:  "var(--radius-md)",
        lg:  "var(--radius-lg)",
        xl:  "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },

      boxShadow: {
        card:        "var(--shadow-card)",
        "card-hover":"var(--shadow-card-hover)",
        elevated:    "var(--shadow-elevated)",
        btn:         "var(--shadow-button)",
        focus:       "var(--shadow-focus)",
        /* Legacy */
        soft:        "0 10px 30px rgba(2, 8, 23, 0.08)",
        "soft-lg":   "0 20px 40px rgba(2, 8, 23, 0.1)",
        cta:         "0 12px 28px rgba(37, 99, 235, 0.25)",
        "cta-hover": "0 20px 40px rgba(37, 99, 235, 0.35)",
        glass:       "0 8px 32px rgba(15, 23, 42, 0.08)",
      },

      backgroundImage: {
        "gradient-title":
          "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #2563eb 100%)",
        "gradient-hero":
          "linear-gradient(135deg, #eff6ff 0%, #f8fafc 50%, #fff 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
