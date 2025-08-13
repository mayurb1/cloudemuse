import GlassCard from "./GlassCard";
import { buildIconUrl } from "../services/weatherService";

export default function WeatherCard({
  city,
  country,
  temp,
  condition,
  humidity,
  wind,
  icon,
  units = "metric",
}) {
  const unitSymbol = units === "metric" ? "°C" : "°F";
  return (
    <GlassCard className="p-6 sm:p-8 overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100 truncate">
            {city}
            {country ? `, ${country}` : ""}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base capitalize">
            {condition}
          </p>
        </div>
        <img
          src={buildIconUrl(icon)}
          alt={condition}
          className="h-16 w-16 sm:h-20 sm:w-20 drop-shadow animate-float-slow"
        />
      </div>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 items-end">
        <div>
          <div className="text-6xl sm:text-7xl font-bold leading-none text-slate-900 dark:text-slate-100">
            {Math.round(temp)}
            <span className="text-3xl align-top">{unitSymbol}</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-slate-500 dark:text-slate-300 text-xs">
            Humidity
          </div>
          <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {Math.round(humidity)}%
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-slate-500 dark:text-slate-300 text-xs">Wind</div>
          <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {Math.round(wind)} {units === "metric" ? "m/s" : "mph"}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
