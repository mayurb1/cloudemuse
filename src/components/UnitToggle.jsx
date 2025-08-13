export default function UnitToggle({ units = "metric", onChange }) {
  return (
    <div className="inline-flex overflow-hidden rounded-full ring-1 ring-slate-200 dark:ring-slate-600 h-11">
      <button
        type="button"
        className={`px-4 h-full text-sm flex items-center justify-center ${
          units === "metric"
            ? "bg-sky-600 text-white"
            : "bg-transparent text-slate-700 dark:text-slate-100"
        }`}
        onClick={() => onChange?.("metric")}
        aria-pressed={units === "metric"}
      >
        °C
      </button>
      <button
        type="button"
        className={`px-4 h-full text-sm flex items-center justify-center ${
          units === "imperial"
            ? "bg-sky-600 text-white"
            : "bg-transparent text-slate-700 dark:text-slate-100"
        }`}
        onClick={() => onChange?.("imperial")}
        aria-pressed={units === "imperial"}
      >
        °F
      </button>
    </div>
  );
}
