/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        cocreatetheme: {
          "primary": "#3985B0",
          "secondary": "#343434",
          "accent": "#F1F0EA",
          "neutral": "#F1F0EA",
          "base-100": "#F1F0EA",
          "info": "#F1F0EA",
          "success": "#A8C69F",
          "warning": "#FDBA74",
          "error": "#F87171",
        },
      }
    ],
  },
};
