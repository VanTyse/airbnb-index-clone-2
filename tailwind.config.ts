import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        vantyse: {
          primary: "#F6475F",
          grey: {
            1: "#222222",
            2: "#DDD",
            3: "#EBEBEB",
            text: "#5E5E5E",
          },
        },
      },
      boxShadow: {
        "vantyse-grey": "0px 4px 4px 0px rgba(0, 0, 0, 0.1)",
        "vantyse-search-btn": "0px 0px 5px 2px rgba(0, 0, 0, 0.1)",
      },
      keyframes: {
        "enter-down": {
          from: { transform: "translateY(-20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },

        "enter-up": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },

        "fade-in-out ": {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "enter-down": "enter-down .6s linear forwards",
        "enter-up": "enter-up .6s linear forwards",
        "enter-left": "enter-up 1s linear forwards",
        "enter-right": "enter-up 1s linear forwards",
        "fade-in-out": "fade-in-out 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
