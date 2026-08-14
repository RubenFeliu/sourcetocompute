import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07090c",
          900: "#0b0e13",
          850: "#0f131a",
          800: "#141922",
          700: "#1c232f",
          600: "#28313f",
          500: "#3a4556",
        },
        steel: {
          400: "#8b98ab",
          300: "#aab5c5",
          200: "#cdd5e0",
          100: "#e8ecf2",
        },
        cyanx: {
          500: "#22d3ee",
          400: "#39dff5",
          600: "#0eb8d4",
        },
        energy: "#4c8dff",
        amberx: "#f5a524",
        greenx: "#34d399",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        wider2: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
