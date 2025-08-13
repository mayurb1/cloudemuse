/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "bg-clear-sky",
    "bg-clouds",
    "bg-rain",
    "bg-snow",
    "bg-thunderstorm",
    "bg-mist",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "clear-sky": "linear-gradient(to bottom, #60a5fa, #fef08a)",
        clouds: "linear-gradient(to bottom, #94a3b8, #cbd5e1)",
        rain: "linear-gradient(to bottom, #60a5fa, #93c5fd, #64748b)",
        snow: "linear-gradient(to bottom, #e2e8f0, #f8fafc)",
        thunderstorm: "linear-gradient(to bottom, #0f172a, #334155)",
        mist: "linear-gradient(to bottom, #cbd5e1, #e2e8f0)",
      },
    },
  },
  plugins: [],
};
