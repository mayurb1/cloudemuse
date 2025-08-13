export default function UnitToggle({ units = "metric", onChange }) {
  return (
    <div className="inline-flex overflow-hidden rounded-md ring-1 ring-slate-200 dark:ring-slate-600">
      <button
        type="button"
        className={`px-3 py-1.5 text-sm ${
          units === "metric"
            ? "bg-sky-600 text-white"
            : "bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-100"
        }`}
        onClick={() => onChange?.("metric")}
      >
        °C
      </button>
      <button
        type="button"
        className={`px-3 py-1.5 text-sm ${
          units === "imperial"
            ? "bg-sky-600 text-white"
            : "bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-100"
        }`}
        onClick={() => onChange?.("imperial")}
      >
        °F
      </button>
    </div>
  );
}
