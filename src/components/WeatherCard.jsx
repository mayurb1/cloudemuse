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
    <div className="card-surface p-6 max-w-xl w-full mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {city}
            {country ? `, ${country}` : ""}
          </h2>
          <p className="text-slate-600 dark:text-slate-300">{condition}</p>
        </div>
        <img src={buildIconUrl(icon)} alt={condition} className="h-16 w-16" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 items-center">
        <div className="text-5xl font-bold text-slate-900 dark:text-slate-100">
          {Math.round(temp)}
          {unitSymbol}
        </div>
        <div className="col-span-2 flex justify-around text-sm">
          <div className="text-center">
            <div className="font-medium text-slate-800 dark:text-slate-200">
              Humidity
            </div>
            <div className="text-slate-700 dark:text-slate-300">
              {Math.round(humidity)}%
            </div>
          </div>
          <div className="text-center">
            <div className="font-medium text-slate-800 dark:text-slate-200">
              Wind
            </div>
            <div className="text-slate-700 dark:text-slate-300">
              {Math.round(wind)} {units === "metric" ? "m/s" : "mph"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
