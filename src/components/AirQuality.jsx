export default function AirQuality({ aqi, pm25, pm10 }) {
  if (aqi == null && pm25 == null && pm10 == null) return null;
  const category = aqiCategory(aqi);
  return (
    <div className="card-surface p-4 mt-6">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-slate-800 dark:text-slate-100">
          Air Quality
        </div>
        <div className={`text-sm ${category.color}`}>{category.label}</div>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-4 text-center text-sm">
        <div>
          <div className="text-slate-600 dark:text-slate-300">AQI</div>
          <div className="font-medium text-slate-800 dark:text-slate-100">
            {aqi ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-slate-600 dark:text-slate-300">PM2.5</div>
          <div className="font-medium text-slate-800 dark:text-slate-100">
            {pm25 ?? "-"} µg/m³
          </div>
        </div>
        <div>
          <div className="text-slate-600 dark:text-slate-300">PM10</div>
          <div className="font-medium text-slate-800 dark:text-slate-100">
            {pm10 ?? "-"} µg/m³
          </div>
        </div>
      </div>
    </div>
  );
}

function aqiCategory(aqi) {
  if (aqi == null)
    return { label: "Unknown", color: "text-slate-500 dark:text-slate-400" };
  if (aqi <= 50)
    return { label: "Good", color: "text-green-600 dark:text-green-400" };
  if (aqi <= 100)
    return { label: "Moderate", color: "text-yellow-700 dark:text-yellow-400" };
  if (aqi <= 150)
    return {
      label: "Unhealthy (SG)",
      color: "text-orange-600 dark:text-orange-400",
    };
  if (aqi <= 200)
    return { label: "Unhealthy", color: "text-red-600 dark:text-red-400" };
  if (aqi <= 300)
    return {
      label: "Very Unhealthy",
      color: "text-purple-600 dark:text-purple-400",
    };
  return { label: "Hazardous", color: "text-rose-700 dark:text-rose-400" };
}
