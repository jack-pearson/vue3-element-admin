/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "menu-default-bg-color": "var(--menu-default-bg-color)",
        "color-white": "var(--color-white)",
        "el-color-primary": "var(--el-color-primary)",
        "color-text-primary": "var(--color-text-primary)",
      },
    },
  },
  plugins: [],
};
