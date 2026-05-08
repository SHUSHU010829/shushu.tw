import type { Config } from "tailwindcss";

import svgToDataUri from "mini-svg-data-uri";
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#68775F",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "surface-void": "hsl(var(--surface-void))",
        "surface-panel": "hsl(var(--surface-panel))",
        "surface-panel-2": "hsl(var(--surface-panel-2))",
        "surface-input": "hsl(var(--surface-input))",
        "surface-tile": "hsl(var(--surface-tile))",
        "signal-live": "hsl(var(--signal-live))",
        "signal-alert": "hsl(var(--signal-alert))",
        "signal-sub": "hsl(var(--signal-sub))",
        "signal-cheer": "hsl(var(--signal-cheer))",
        "signal-tier2": "hsl(var(--signal-tier2))",
        "signal-tier3": "hsl(var(--signal-tier3))",
        "signal-raid": "hsl(var(--signal-raid))",
        "signal-hype": "hsl(var(--signal-hype))",
        "border-faint": "hsl(var(--border-faint))",
        "border-subtle": "hsl(var(--border-subtle))",
        "border-strong": "hsl(var(--border-strong))",
        "text-primary": "hsl(var(--text-primary))",
        "text-body": "hsl(var(--text-body))",
        "text-muted": "hsl(var(--text-muted))",
        "text-subtle": "hsl(var(--text-subtle))",
        "text-dim": "hsl(var(--text-dim))",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-space-mono)", "Space Mono", "var(--font-geist-mono)", "ui-monospace", "monospace"],
        notoSans: ["var(--font-noto-sans-tc)"],
        rubik: ["var(--font-rubik)"],
      },
      boxShadow: {
        "drop-shadow": "0px 2px 10px rgba(25, 1, 52, 0.12)",
      },
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "live-ping": "live-ping 1.5s ease-out infinite",
        "pulse-red": "pulse-red 1.2s ease-in-out infinite",
        "scanline-drift": "scanline-drift 8s linear infinite",
        "signal-glitch": "signal-glitch 0.15s steps(2) infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "shine-pulse": {
          "0%": { "background-position": "0% 0%" },
          "50%": { "background-position": "100% 100%" },
          to: { "background-position": "0% 0%" },
        },
        "border-beam": {
          "100%": { "offset-distance": "100%" },
        },
        "live-ping": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "70%": { transform: "scale(2.2)", opacity: "0" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        "pulse-red": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        "scanline-drift": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(3px)" },
        },
        "signal-glitch": {
          "0%": { textShadow: "2px 0 #ff00ff, -2px 0 #00ffff" },
          "50%": { textShadow: "-2px 0 #ff00ff, 2px 0 #00ffff" },
          "100%": { textShadow: "2px 0 #ff00ff, -2px 0 #00ffff" },
        },
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};

export default config;
