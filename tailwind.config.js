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
      keyframes: {
        gradientMove: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        "gradient-slow": "gradientMove 12s ease infinite",
        "fade-in-up": "fadeInUp 400ms ease-out both",
        "float-slow": "float 6s ease-in-out infinite",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
