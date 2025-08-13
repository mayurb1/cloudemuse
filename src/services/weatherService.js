export const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const isProd = import.meta.env.PROD;
const netlifyProxy = "/.netlify/functions/weather";

if (!API_KEY && !isProd) {
  // eslint-disable-next-line no-console
  console.warn(
    "Missing VITE_OPENWEATHER_API_KEY for local dev. In production, Netlify function will be used."
  );
}

export function buildIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function owmUrl(path) {
  if (isProd) {
    return `${netlifyProxy}${path}`;
  }
  return `${OPENWEATHER_BASE_URL}${path}${
    path.includes("?") ? "&" : "?"
  }appid=${API_KEY}`;
}

export async function fetchCurrentWeatherByCity(city, units = "metric") {
  const url = isProd
    ? `${netlifyProxy}?route=current&city=${encodeURIComponent(
        city
      )}&units=${units}`
    : owmUrl(`/weather?q=${encodeURIComponent(city)}&units=${units}`);
  return request(url);
}

export async function fetchForecastByCity(city, units = "metric") {
  const url = isProd
    ? `${netlifyProxy}?route=forecast&city=${encodeURIComponent(
        city
      )}&units=${units}`
    : owmUrl(`/forecast?q=${encodeURIComponent(city)}&units=${units}`);
  return request(url);
}

export async function fetchCurrentWeatherByCoords(lat, lon, units = "metric") {
  const url = isProd
    ? `${netlifyProxy}?route=currentByCoords&lat=${lat}&lon=${lon}&units=${units}`
    : owmUrl(`/weather?lat=${lat}&lon=${lon}&units=${units}`);
  return request(url);
}

export async function fetchForecastByCoords(lat, lon, units = "metric") {
  const url = isProd
    ? `${netlifyProxy}?route=forecastByCoords&lat=${lat}&lon=${lon}&units=${units}`
    : owmUrl(`/forecast?lat=${lat}&lon=${lon}&units=${units}`);
  return request(url);
}

async function request(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

export function groupForecastByDay(list) {
  const byDate = list.reduce((acc, item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  const days = Object.entries(byDate).map(([date, readings]) => {
    let min = Infinity;
    let max = -Infinity;
    let atNoon = readings[0];
    for (const r of readings) {
      min = Math.min(min, r.main.temp_min);
      max = Math.max(max, r.main.temp_max);
      if (r.dt_txt.includes("12:00:00")) atNoon = r;
    }
    return {
      date,
      min: Math.round(min),
      max: Math.round(max),
      icon: atNoon.weather?.[0]?.icon,
      condition: atNoon.weather?.[0]?.main,
    };
  });

  return days.slice(0, 5);
}

export function getBackgroundKey(condition = "") {
  const c = condition.toLowerCase();
  if (c.includes("thunder")) return "thunderstorm";
  if (c.includes("rain") || c.includes("drizzle")) return "rain";
  if (c.includes("snow")) return "snow";
  if (c.includes("cloud")) return "clouds";
  if (c.includes("mist") || c.includes("fog") || c.includes("haze"))
    return "mist";
  return "clear-sky";
}

// ------------------ Open-Meteo Fallback (no API key) ------------------
const OPEN_METEO_BASE = "https://api.open-meteo.com/v1/forecast";
const OPEN_METEO_GEOCODE = "https://geocoding-api.open-meteo.com/v1/search";
const OPEN_METEO_AIR = "https://air-quality-api.open-meteo.com/v1/air-quality";

function mapUnitsToOpenMeteo(units) {
  return {
    temperature_unit: units === "imperial" ? "fahrenheit" : "celsius",
    windspeed_unit: units === "imperial" ? "mph" : "ms",
  };
}

function mapWeatherCode(code) {
  const n = Number(code);
  // Returns { condition, icon }
  if (n === 0) return { condition: "Clear", icon: "01d" };
  if ([1, 2, 3].includes(n)) return { condition: "Clouds", icon: "03d" };
  if ([45, 48].includes(n)) return { condition: "Mist", icon: "50d" };
  if ([51, 53, 55, 56, 57].includes(n))
    return { condition: "Drizzle", icon: "09d" };
  if ([61, 63, 65, 80, 81, 82].includes(n))
    return { condition: "Rain", icon: "10d" };
  if ([66, 67].includes(n)) return { condition: "Freezing Rain", icon: "10d" };
  if ([71, 73, 75, 77, 85, 86].includes(n))
    return { condition: "Snow", icon: "13d" };
  if ([95, 96, 99].includes(n))
    return { condition: "Thunderstorm", icon: "11d" };
  return { condition: "Clear", icon: "01d" };
}

async function geocodeCityToCoords(city) {
  const url = `${OPEN_METEO_GEOCODE}?name=${encodeURIComponent(
    city
  )}&count=1&language=en&format=json`;
  const data = await request(url);
  const place = data?.results?.[0];
  if (!place) throw new Error("City not found");
  return {
    name: place.name,
    country: place.country_code,
    lat: place.latitude,
    lon: place.longitude,
  };
}

async function fetchOpenMeteoByCoords(
  lat,
  lon,
  units = "metric",
  overrideName,
  overrideCountry
) {
  const { temperature_unit, windspeed_unit } = mapUnitsToOpenMeteo(units);
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    forecast_days: "5",
    temperature_unit,
    windspeed_unit,
  });
  const url = `${OPEN_METEO_BASE}?${params.toString()}`;
  const data = await request(url);

  const wc = mapWeatherCode(data?.current?.weather_code);
  const current = {
    name: overrideName || "",
    sys: { country: overrideCountry || "" },
    main: {
      temp: data?.current?.temperature_2m,
      humidity: data?.current?.relative_humidity_2m,
    },
    wind: { speed: data?.current?.wind_speed_10m },
    weather: [{ main: wc.condition, description: wc.condition, icon: wc.icon }],
  };

  const days = (data?.daily?.time || []).map((date, idx) => {
    const code = data.daily.weather_code?.[idx];
    const m = mapWeatherCode(code);
    return {
      date,
      min: Math.round(data.daily.temperature_2m_min?.[idx] ?? 0),
      max: Math.round(data.daily.temperature_2m_max?.[idx] ?? 0),
      icon: m.icon,
      condition: m.condition,
    };
  });

  return { current, days };
}

export async function fetchOpenMeteoHourly(lat, lon, units = "metric") {
  const { temperature_unit, windspeed_unit } = mapUnitsToOpenMeteo(units);
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    hourly: "temperature_2m,weather_code",
    temperature_unit,
    windspeed_unit,
    forecast_hours: "24",
  });
  const url = `${OPEN_METEO_BASE}?${params.toString()}`;
  const data = await request(url);
  const hours = (data?.hourly?.time || []).map((time, i) => {
    const code = data.hourly.weather_code?.[i];
    const m = mapWeatherCode(code);
    return {
      time,
      temp: data.hourly.temperature_2m?.[i],
      condition: m.condition,
    };
  });
  return hours;
}

export async function fetchOpenMeteoAirQuality(lat, lon) {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    hourly: "pm10,pm2_5,us_aqi",
    forecast_hours: "1",
  });
  const url = `${OPEN_METEO_AIR}?${params.toString()}`;
  const data = await request(url);
  return {
    aqi: data?.hourly?.us_aqi?.[0] ?? null,
    pm25: data?.hourly?.pm2_5?.[0] ?? null,
    pm10: data?.hourly?.pm10?.[0] ?? null,
  };
}

export async function getExtrasByCoords(lat, lon, units = "metric") {
  const [hours, air] = await Promise.all([
    fetchOpenMeteoHourly(lat, lon, units),
    fetchOpenMeteoAirQuality(lat, lon),
  ]);
  return { hours, air };
}

export async function getWeatherByCity(city, units = "metric") {
  try {
    const [cw, fc] = await Promise.all([
      fetchCurrentWeatherByCity(city, units),
      fetchForecastByCity(city, units),
    ]);
    return { current: cw, days: groupForecastByDay(fc.list || []) };
  } catch {
    const geo = await geocodeCityToCoords(city);
    return fetchOpenMeteoByCoords(
      geo.lat,
      geo.lon,
      units,
      geo.name,
      geo.country
    );
  }
}

export async function getWeatherByCoords(lat, lon, units = "metric") {
  try {
    const [cw, fc] = await Promise.all([
      fetchCurrentWeatherByCoords(lat, lon, units),
      fetchForecastByCoords(lat, lon, units),
    ]);
    return { current: cw, days: groupForecastByDay(fc.list || []) };
  } catch {
    return fetchOpenMeteoByCoords(lat, lon, units);
  }
}

export async function searchCities(query, limit = 5) {
  if (!query || query.trim().length < 2) return [];
  const url = `${OPEN_METEO_GEOCODE}?name=${encodeURIComponent(
    query
  )}&count=${limit}&language=en&format=json`;
  const data = await request(url);
  const results = data?.results || [];
  return results.map((r) => ({
    name: r.name,
    country: r.country_code,
    admin1: r.admin1,
    lat: r.latitude,
    lon: r.longitude,
    label: [r.name, r.admin1, r.country_code].filter(Boolean).join(", "),
  }));
}
