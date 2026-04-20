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
        brand: {
          navy: "#0F2A4A",
          gold: "#B8860B",
          "gold-light": "#D4A843",
          red: "#C0392B",
          "red-light": "#E74C3C",
          green: "#1E6F4A",
          "green-light": "#27AE60",
          "tree-green": "#4CAF50",
          "tree-teal": "#26A69A",
          "tree-lime": "#8BC34A",
          "tree-cyan": "#00BCD4",
          blue: "#1565C0",
        },
        neutral: {
          50: "#F8F9FA",
          100: "#F2F2F2",
          200: "#E5E5E5",
          300: "#D9D9D9",
          400: "#BDBDBD",
          500: "#9E9E9E",
          600: "#757575",
          700: "#595959",
          800: "#424242",
          900: "#212121",
        },
        carbon: {
          "gray-10": "#f4f4f4",
          "gray-20": "#e0e0e0",
          "gray-30": "#c6c6c6",
          "gray-50": "#8d8d8d",
          "gray-60": "#6f6f6f",
          "gray-70": "#525252",
          "gray-80": "#393939",
          "gray-90": "#262626",
          "gray-100": "#161616",
          "blue-60": "#0f62fe",
          "blue-70": "#0043ce",
          white: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "Inter", "system-ui", "sans-serif"],
        arabic: ["IBM Plex Sans Arabic", "Tajawal", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      spacing: {
        "carbon-01": "0.125rem",
        "carbon-02": "0.25rem",
        "carbon-03": "0.5rem",
        "carbon-04": "0.75rem",
        "carbon-05": "1rem",
        "carbon-06": "1.5rem",
        "carbon-07": "2rem",
        "carbon-08": "2.5rem",
        "carbon-09": "3rem",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
