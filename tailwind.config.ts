import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        textPrimary: "rgb(var(--text-primary-color))",
        primary: "rgb(var(--primary-color))",
        secondary: "rgb(var(--secondary-color))",
        action: "rgb(var(--action-color))",
      },
      boxShadow: {
        neumorphism: "var(--neumorphism-box-shadow)",
        neumorphismInset: "var(--neumorphism-inset-box-shadow)",
      },
      animation: {
        slideup: "slideup 1s ease-in-out",
        slidedown: "slidedown 1s ease-in-out",
        slideleft: "slideleft 1s ease-in-out",
        slideright: "slideright 1s ease-in-out",
        wave: "wave 1.2s linear infinite",
        slowfade: "slowfade 2.2s ease-in-out",
      },
      keyframes: {
        slowfade: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideup: {
          from: { opacity: "0", transform: "translateY(25%)" },
          to: { opacity: "1", transform: "none" },
        },
        slidedown: {
          from: { opacity: "0", transform: "translateY(-25%)" },
          to: { opacity: "1", transform: "none" },
        },
        slideleft: {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideright: {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        wave: {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
