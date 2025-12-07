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
        // Primary color scale (Blue - Main brand color)
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',  // Primary action buttons
          600: '#2563EB',  // Hover state
          700: '#1D4ED8',  // Active state
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },
        // Secondary color scale (Purple - Merit scholarships)
        secondary: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        // Tertiary color scale (Pink - Need-based scholarships)
        tertiary: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D',
          800: '#9F1239',
          900: '#831843',
        },
        // Success color scale (Green - Matched scholarships)
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        // Warning color scale (Amber - Deadline approaching)
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Error color scale (Red - Requirements not met)
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        // Info color scale (Cyan - Informational badges)
        info: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        // Scholarship semantic colors (shortcuts)
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

