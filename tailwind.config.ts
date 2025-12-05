import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#4338ca", // Indigo
        "background-light": "#f4f4f5", // Zinc-100
        "background-dark": "#18181b", // Zinc-900
      },
      fontFamily: {
        // Mapping Inter to both sans (default) and display as per your previous config
        sans: ["Inter", "sans-serif"],
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
  plugins: [
    forms,
    typography,
  ],
} satisfies Config