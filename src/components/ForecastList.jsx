import { buildIconUrl } from "../services/weatherService";

export default function ForecastList({ days = [], units = "metric" }) {
  const unitSymbol = units === "metric" ? "°C" : "°F";
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {days.map((d) => (
        <div key={d.date} className="card-surface p-4 text-center">
          <div className="text-sm text-slate-600 dark:text-slate-300">
            {new Date(d.date).toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </div>
          <img
            src={buildIconUrl(d.icon)}
            alt={d.condition}
            className="mx-auto h-12 w-12"
          />
          <div className="mt-2 font-medium text-slate-800 dark:text-slate-200">
            {d.condition}
          </div>
          <div className="text-slate-700 dark:text-slate-300">
            {d.min}
            {unitSymbol} / {d.max}
            {unitSymbol}
          </div>
        </div>
      ))}
    </div>
  );
}
