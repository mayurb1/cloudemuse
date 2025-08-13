export default function HourlyChart({ hours = [], units = "metric" }) {
  if (!hours.length) return null;
  const unitSymbol = units === "metric" ? "°C" : "°F";
  const items = hours.slice(0, 24);

  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 sm:gap-3">
        {items.map((h) => (
          <div
            key={h.time}
            className="card-surface p-3 text-center select-none"
          >
            <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-300">
              {new Date(h.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100">
              {Math.round(h.temp)}
              {unitSymbol}
            </div>
            <div className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300">
              {h.condition}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
