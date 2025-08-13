import { useTheme } from "../theme/theme.jsx";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  function toggle() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      aria-label="Toggle theme"
      title={isDark ? "Switch to light" : "Switch to dark"}
      onClick={toggle}
      aria-pressed={isDark}
      className={`relative inline-flex h-8 w-16 items-center rounded-full ring-1 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 ${
        isDark ? "bg-slate-800 ring-slate-600" : "bg-white ring-slate-300"
      }`}
    >
      <div className="absolute left-2 text-amber-500">
        <Sun className="h-4 w-4" />
      </div>
      <div className="absolute right-2 text-slate-300">
        <Moon className="h-4 w-4" />
      </div>
      <span
        className={`absolute top-1 h-6 w-6 transform rounded-full shadow-md transition-transform ${
          isDark ? "translate-x-9 bg-slate-700" : "translate-x-1 bg-sky-500"
        }`}
      />
    </button>
  );
}
