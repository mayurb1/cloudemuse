import { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";
import LoadingSpinner from "../components/LoadingSpinner";
import UnitToggle from "../components/UnitToggle";
import FavoritesMenu from "../components/FavoritesMenu";
import UseLocationButton from "../components/UseLocationButton";
import HourlyChart from "../components/HourlyChart";
import AirQuality from "../components/AirQuality";
import ThemeToggle from "../components/ThemeToggle";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  getWeatherByCity,
  getWeatherByCoords,
  getBackgroundKey,
  getExtrasByCoords,
} from "../services/weatherService";
import { getBackgroundStyle, useTheme } from "../theme/theme";
import { useToast } from "../ui/ToastProvider.jsx";
import { CardSkeleton, RowSkeleton } from "../components/Skeletons.jsx";

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
  const { showToast } = useToast();

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
    if (favorites.includes(city)) return;
    setFavorites((prev) => [...prev, city]);
    showToast(`${city} added to favorites`, { type: "success" });
  }
  function removeFavorite(city) {
    if (!favorites.includes(city)) return;
    setFavorites((prev) => prev.filter((c) => c !== city));
    showToast(`${city} removed from favorites`, { type: "info" });
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
      <Header />
      <main className="mx-auto max-w-6xl px-3 sm:px-4 py-6 sm:py-8 animate-fade-in-up">
        <div>
          <SearchBar
            initialValue={cityQuery}
            onSearch={loadByCity}
            onSelectSuggestion={handleSelectSuggestion}
          />
          <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
            <FavoritesMenu
              items={favorites}
              onSelect={loadByCity}
              onRemove={removeFavorite}
              canAddCurrent={!!current?.name}
              onAddCurrent={() => addFavorite(current.name)}
            />
            <UnitToggle units={units} onChange={setUnits} />
          </div>
        </div>
        {loading && (
          <div className="mt-6 space-y-6">
            <CardSkeleton />
            <RowSkeleton />
          </div>
        )}
        {error && (
          <div className="mt-4 rounded-md bg-red-50 text-red-700 ring-1 ring-red-200 p-3 text-sm">
            {error}
          </div>
        )}
        {current && (
          <div className="mt-5 sm:mt-6 space-y-6">
            <div className="animate-fade-in-up">
              <WeatherCard
                city={current.name}
                country={current.sys?.country}
                temp={current.main?.temp}
                condition={
                  current.weather?.[0]?.description ||
                  current.weather?.[0]?.main
                }
                humidity={current.main?.humidity}
                wind={current.wind?.speed}
                icon={current.weather?.[0]?.icon}
                units={units}
              />
            </div>
            <div className="animate-fade-in-up">
              <ForecastList days={forecast} units={units} />
            </div>
            <div className="animate-fade-in-up">
              <HourlyChart hours={hours} units={units} />
            </div>
            <div className="animate-fade-in-up">
              <AirQuality aqi={air.aqi} pm25={air.pm25} pm10={air.pm10} />
            </div>
          </div>
        )}
        {!current && !loading && !error && (
          <div className="mt-10 text-center text-slate-700">
            Search for a city or allow location access to see weather.
          </div>
        )}
        <Footer />
      </main>
    </div>
  );
}
