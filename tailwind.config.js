/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        karla: ["Karla","Helvetica Neue", "sans-serif"],
        lato: ["Lato","Helvetica Neue", "sans-serif"],
        lora: ["Lora","Helvetica Neue", "sans-serif"],
        brolink: ["Brolink", "sans-seri"]
      },
    },
  },
  plugins: [],
};
