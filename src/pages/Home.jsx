import { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";
import LoadingSpinner from "../components/LoadingSpinner";
import UnitToggle from "../components/UnitToggle";
import Favorites from "../components/Favorites";
import UseLocationButton from "../components/UseLocationButton";
import HourlyChart from "../components/HourlyChart";
import AirQuality from "../components/AirQuality";
import ThemeToggle from "../components/ThemeToggle";
import FavoriteButton from "../components/FavoriteButton";
import {
  getWeatherByCity,
  getWeatherByCoords,
  getBackgroundKey,
  getExtrasByCoords,
} from "../services/weatherService";
import { getBackgroundStyle, useTheme } from "../theme/theme";

const LAST_CITY_KEY = "last_city";
const FAVS_KEY = "favorite_cities";

export default function Home() {
  const [units, setUnits] = useState(
    () => localStorage.getItem("units") || "metric"
  );
  const [cityQuery, setCityQuery] = useState(
    () => localStorage.getItem(LAST_CITY_KEY) || ""
  );
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVS_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hours, setHours] = useState([]);
  const [air, setAir] = useState({ aqi: null, pm25: null, pm10: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    localStorage.setItem("units", units);
  }, [units]);

  useEffect(() => {
    localStorage.setItem(FAVS_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (!current && !cityQuery) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            await loadByCoords(pos.coords.latitude, pos.coords.longitude);
          },
          () => {}
        );
      }
    }
    if (cityQuery) {
      loadByCity(cityQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backgroundKey = useMemo(
    () => getBackgroundKey(current?.weather?.[0]?.main || ""),
    [current]
  );
  const bgStyle = useMemo(
    () => getBackgroundStyle(backgroundKey, resolvedTheme),
    [backgroundKey, resolvedTheme]
  );

  async function loadByCity(city) {
    try {
      setLoading(true);
      setError("");
      const { current: cw, days } = await getWeatherByCity(city, units);
      setCurrent(cw);
      setForecast(days);
      setCityQuery(city);
      localStorage.setItem(LAST_CITY_KEY, city);
      if (cw?.coord?.lat && cw?.coord?.lon) {
        const extra = await getExtrasByCoords(
          cw.coord.lat,
          cw.coord.lon,
          units
        );
        setHours(extra.hours);
        setAir(extra.air);
      } else {
        setHours([]);
        setAir({ aqi: null, pm25: null, pm10: null });
      }
    } catch {
      setError("City not found or API error.");
      setCurrent(null);
      setForecast([]);
      setHours([]);
      setAir({ aqi: null, pm25: null, pm10: null });
    } finally {
      setLoading(false);
    }
  }

  async function loadByCoords(lat, lon) {
    try {
      setLoading(true);
      setError("");
      const { current: cw, days } = await getWeatherByCoords(lat, lon, units);
      setCurrent({ ...cw, coord: { lat, lon } });
      setForecast(days);
      setCityQuery(`${cw.name}`);
      localStorage.setItem(LAST_CITY_KEY, cw.name);
      const extra = await getExtrasByCoords(lat, lon, units);
      setHours(extra.hours);
      setAir(extra.air);
    } catch {
      setError("Could not load local weather.");
      setCurrent(null);
      setForecast([]);
      setHours([]);
      setAir({ aqi: null, pm25: null, pm10: null });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!current && !cityQuery) return;
    if (current?.coord) {
      loadByCoords(current.coord.lat, current.coord.lon);
      return;
    }
    if (cityQuery) loadByCity(cityQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units]);

  function addFavorite(city) {
    if (!city) return;
    setFavorites((prev) => (prev.includes(city) ? prev : [...prev, city]));
  }
  function removeFavorite(city) {
    setFavorites((prev) => prev.filter((c) => c !== city));
  }

  function handleSelectSuggestion(s) {
    // If coordinates provided, prefer loading by coords for precise data
    if (s?.lat != null && s?.lon != null) {
      loadByCoords(s.lat, s.lon);
    } else if (s?.name) {
      loadByCity(s.name);
    }
  }

  return (
    <div className="min-h-screen w-full bg-fixed" style={bgStyle}>
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div className="flex-1 w-full">
            <SearchBar
              initialValue={cityQuery}
              onSearch={loadByCity}
              onSelectSuggestion={handleSelectSuggestion}
            />
          </div>
          <div className="flex items-center gap-2">
            <UseLocationButton
              onLocate={() => {
                if ("geolocation" in navigator) {
                  navigator.geolocation.getCurrentPosition((pos) =>
                    loadByCoords(pos.coords.latitude, pos.coords.longitude)
                  );
                }
              }}
            />
            <UnitToggle units={units} onChange={setUnits} />
            <ThemeToggle />
          </div>
        </div>

        <Favorites
          items={favorites}
          onSelect={loadByCity}
          onRemove={removeFavorite}
        />

        {loading && <LoadingSpinner />}
        {error && (
          <div className="mt-4 rounded-md bg-red-50 text-red-700 ring-1 ring-red-200 p-3 text-sm">
            {error}
          </div>
        )}

        {current && (
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <div className="section-title">Now</div>
              <FavoriteButton
                active={favorites.includes(current.name)}
                onClick={() => {
                  if (favorites.includes(current.name))
                    removeFavorite(current.name);
                  else addFavorite(current.name);
                }}
              />
            </div>
            <WeatherCard
              city={current.name}
              country={current.sys?.country}
              temp={current.main?.temp}
              condition={
                current.weather?.[0]?.description || current.weather?.[0]?.main
              }
              humidity={current.main?.humidity}
              wind={current.wind?.speed}
              icon={current.weather?.[0]?.icon}
              units={units}
            />
            <ForecastList days={forecast} units={units} />
            <HourlyChart hours={hours} units={units} />
            <AirQuality aqi={air.aqi} pm25={air.pm25} pm10={air.pm10} />
          </div>
        )}

        {!current && !loading && !error && (
          <div className="mt-10 text-center text-slate-700">
            Search for a city or allow location access to see weather.
          </div>
        )}
      </div>
    </div>
  );
}
