/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "error-color": "var(--error--color)",
        "border-color": "var(--border--color)",
        "border-error-color": "var(--border--error--color)",
        "primary-color": "#1677ff",
        "primary-hover-color": "#4096ff",
      },
      boxShadow: {
        "input-shadow": "0 0 0 2px rgba(5, 145, 255, 0.1)",
      },
    },
  },
  plugins: [],
};
