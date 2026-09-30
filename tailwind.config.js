/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#6c63ff",
        secondary: "#00d4ff",
        dark: {
          bg: "#0a0a0f",
          card: "#12121a",
          border: "#1e1e2e",
        },
        textPrimary: "#ffffff",
        textSecondary: "#a0a0b0",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(108, 99, 255, 0.35)',
        'glow-secondary': '0 0 20px rgba(0, 212, 255, 0.35)',
        'card-light': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'card-dark': '0 8px 30px -4px rgba(0, 0, 0, 0.5), 0 4px 12px -2px rgba(0, 0, 0, 0.3)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "3rem",
        },
      },
    },
  },
  plugins: [],
};