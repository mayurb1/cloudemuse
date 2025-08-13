import { buildIconUrl } from "../services/weatherService";

export default function ForecastList({ days = [], units = "metric" }) {
  const unitSymbol = units === "metric" ? "°C" : "°F";
  return (
    <div className="mt-6 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {days.map((d) => (
        <div key={d.date} className="card-surface p-3 sm:p-4 text-center">
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {new Date(d.date).toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </div>
          <img
            src={buildIconUrl(d.icon)}
            alt={d.condition}
            className="mx-auto h-10 w-10 sm:h-12 sm:w-12"
          />
          <div className="mt-2 font-medium text-slate-800 dark:text-slate-200 text-sm sm:text-base">
            {d.condition}
          </div>
          <div className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">
            {d.min}
            {unitSymbol} / {d.max}
            {unitSymbol}
          </div>
        </div>
      ))}
    </div>
  );
}
