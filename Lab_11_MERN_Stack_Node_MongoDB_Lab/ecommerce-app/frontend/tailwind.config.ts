import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        cloud: "#f8fafc",
        mist: "#edf2f7",
        graphite: "#475569",
        accent: "#0f766e",
        coral: "#f97316",
      },
      boxShadow: {
        premium: "0 24px 70px rgba(15, 23, 42, 0.12)",
        lift: "0 18px 42px rgba(15, 23, 42, 0.14)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 650ms ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
