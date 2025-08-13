export default function HourlyChart({ hours = [], units = "metric" }) {
  if (!hours.length) return null;
  const unitSymbol = units === "metric" ? "°C" : "°F";
  return (
    <div className="mt-6 overflow-x-auto">
      <div className="min-w-[640px] grid grid-cols-12 gap-2">
        {hours.slice(0, 24).map((h) => (
          <div key={h.time} className="card-surface p-3 text-center">
            <div className="text-xs text-slate-500 dark:text-slate-300">
              {new Date(h.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {Math.round(h.temp)}
              {unitSymbol}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300">
              {h.condition}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
