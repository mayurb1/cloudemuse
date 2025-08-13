# Weather App (React + Vite + Tailwind)

A simple, responsive weather application using React, Vite, and Tailwind CSS. It supports city search, geolocation, current weather, 5-day forecast, hourly forecast, air quality, loading and error states, unit toggle (°C/°F), dynamic backgrounds, favorites, theme toggle, and persists last searched city.

## Features

- Search weather by city
- Detect location via browser Geolocation API + Use my location button
- Current weather: temperature, condition, humidity, wind, icon
- 5-day forecast grouped by day
- Hourly forecast (next 24h)
- Air quality (AQI, PM2.5, PM10)
- Loading and error states
- Unit toggle (Celsius/Fahrenheit)
- Dynamic background by condition
- Favorites with localStorage
- Theme toggle (light/dark)
- Remembers last searched city

## Tech Stack

- React + Vite
- Tailwind CSS
- APIs: OpenWeatherMap (free) with Open‑Meteo fallback (free) for weather/forecast/hourly and Open‑Meteo Air Quality for AQI

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create `.env` in the project root and add your OpenWeatherMap API key:

```bash
echo "VITE_OPENWEATHER_API_KEY=YOUR_API_KEY" > .env
```

3. Run the dev server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
npm run preview
```

## Notes

- OpenWeatherMap key is optional now. If OWM calls fail, the app falls back to Open‑Meteo for weather and to Open‑Meteo Air Quality for AQI.
- Environment variables are accessed with `import.meta.env.VITE_OPENWEATHER_API_KEY`.

## Deploy on Netlify

- This repo includes `netlify.toml` with:
  - build command: `npm run build`
  - publish directory: `dist`
  - SPA redirect for client-side routing
  - Node version 20

Steps:

1. Push your code to GitHub/GitLab/Bitbucket.
2. In Netlify, “Add new site” → “Import an existing project”.
3. Select your repo. Use these settings if prompted:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variable in Netlify site settings:
   - `VITE_OPENWEATHER_API_KEY=YOUR_API_KEY`
5. Deploy. Netlify will build and host your app.
