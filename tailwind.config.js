/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#030712",
        accent: "#00FF87",
        "accent-2": "#00D4FF",
        background: "#030712",
        text: "#E2FFF6",
        muted: "#0D1117",
        "muted-2": "#161B22",
        border: "#1F2D3D",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(0,255,135,0.25), 0 0 60px rgba(0,255,135,0.08)",
        "glow-cyan": "0 0 20px rgba(0,212,255,0.3), 0 0 60px rgba(0,212,255,0.1)",
      },
    },
  },
  plugins: [],
}
