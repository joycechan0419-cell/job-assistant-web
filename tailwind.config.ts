import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // NES 像素调色板（来自 y-n10-design.md）
        pixel: {
          red: "#E53935",
          yellow: "#FDD835",
          blue: "#1E88E5",
          green: "#43A047",
          gray: "#4D4D4D",
          bg: "#121212",
          surface: "#121212",
          card: "#1a1a1a",
          line: "#4D4D4D",
          text: "#ffffff",
          sub: "#C0C0C0",
          mute: "#9a9a9a",
        },
        status: {
          hard: "#E53935",
          soft: "#FDD835",
          ok: "#43A047",
          info: "#1E88E5",
          hardBg: "#3a1717",
          softBg: "#3a3110",
          okBg: "#103a1a",
          infoBg: "#102a3a",
        },
        // 保留旧 token，避免历史组件引用失效
        brand: {
          DEFAULT: "#43A047",
          2: "#FDD835",
          soft: "#FDD835",
        },
        surface: {
          DEFAULT: "#1a1a1a",
          bg: "#121212",
          card: "#1a1a1a",
        },
        ink: {
          DEFAULT: "#ffffff",
          sub: "#C0C0C0",
          mute: "#9a9a9a",
          line: "#4D4D4D",
        },
      },
      borderRadius: {
        none: "0",
        sm: "0",
        DEFAULT: "0",
        md: "0",
        lg: "0",
        xl: "0",
        "2xl": "0",
        "3xl": "0",
        full: "0",
        card: "0",
      },
      boxShadow: {
        none: "none",
        pixel: "0 0 0 2px #FDD835",
        card: "none",
        soft: "none",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Noto Sans JP"',
          '"Microsoft YaHei"',
          "system-ui",
          "sans-serif",
        ],
        pixel: ["var(--font-pixel)", '"Press Start 2P"', "ui-monospace", "monospace"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "pixel-blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0.25" },
        },
        scanline: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 6px" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "pulse-soft": "pulse-soft 1.5s ease-in-out infinite",
        "pixel-blink": "pixel-blink 1.2s steps(2) infinite",
        scanline: "scanline 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
