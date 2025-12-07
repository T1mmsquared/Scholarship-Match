/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-primary)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      colors: {
        scholarship: {
          primary: '#3B82F6',
          secondary: '#8B5CF6',
          tertiary: '#EC4899',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#0EA5E9',
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#3B82F6",
          "secondary": "#8B5CF6",
          "accent": "#EC4899",
          "neutral": "#1E293B",
          "base-100": "#FFFFFF",
          "base-200": "#F8FAFC",
          "base-300": "#F1F5F9",
          "info": "#0EA5E9",
          "success": "#10B981",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
      },
      {
        dark: {
          "primary": "#3B82F6",
          "secondary": "#8B5CF6",
          "accent": "#EC4899",
          "neutral": "#334155",
          "base-100": "#0F172A",
          "base-200": "#1E293B",
          "base-300": "#334155",
          "info": "#0EA5E9",
          "success": "#10B981",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
      },
      {
        cyberpunk: {
          "primary": "#FF006E",
          "secondary": "#00F5FF",
          "accent": "#FB5607",
          "neutral": "#1a1625",
          "base-100": "#0d0221",
          "base-200": "#1a0933",
          "base-300": "#240d4a",
          "info": "#00F5FF",
          "success": "#4ADE80",
          "warning": "#FACC15",
          "error": "#EF4444",
        },
      },
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
};

