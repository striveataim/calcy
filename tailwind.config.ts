import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0d0d12",
        ink2: "#1c1c26",
        surface: "#f8f7f4",
        surface2: "#f0ede8",
        card: "#ffffff",
        border: "#e6e2da",
        border2: "#cec9bf",
        text: "#1a1814",
        text2: "#3d3a35",
        muted: "#7c7870",
        soft: "#aba69f",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,.05)",
        md: "0 4px 16px rgba(0,0,0,.06),0 1px 3px rgba(0,0,0,.04)",
        lg: "0 8px 32px rgba(0,0,0,.08),0 2px 8px rgba(0,0,0,.04)",
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        fadeIn: "fadeIn 0.3s ease-in",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
