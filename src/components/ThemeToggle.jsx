import { useTheme } from "../theme/theme.jsx";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="inline-flex items-center gap-2">
      <div className="text-xs text-slate-600 dark:text-slate-300">Theme:</div>
      <div className="inline-flex overflow-hidden rounded-md ring-1 ring-slate-200 dark:ring-slate-600">
        <button
          onClick={() => setTheme("light")}
          className={`px-3 py-1 text-sm ${
            theme === "light"
              ? "bg-sky-600 text-white"
              : "bg-white dark:bg-slate-800 dark:text-slate-100"
          }`}
        >
          Light
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`px-3 py-1 text-sm ${
            theme === "dark"
              ? "bg-sky-600 text-white"
              : "bg-white dark:bg-slate-800 dark:text-slate-100"
          }`}
        >
          Dark
        </button>
      </div>
    </div>
  );
}
