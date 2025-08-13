/* eslint-disable no-undef */
/* Netlify Functions runtime: Node.js */
exports.handler = async function (event) {
  try {
    const apiKey = process.env.OWM_API_KEY;
    if (!apiKey) {
      return json(500, { error: "Server is not configured with OWM_API_KEY" });
    }

    const params = event.queryStringParameters || {};
    const route = params.route || "current";
    const units = params.units || "metric";

    let url = null;
    const base = "https://api.openweathermap.org/data/2.5";

    switch (route) {
      case "current": {
        const city = params.city;
        if (!city) return json(400, { error: "city is required" });
        url = `${base}/weather?q=${encodeURIComponent(
          city
        )}&appid=${apiKey}&units=${units}`;
        break;
      }
      case "forecast": {
        const city = params.city;
        if (!city) return json(400, { error: "city is required" });
        url = `${base}/forecast?q=${encodeURIComponent(
          city
        )}&appid=${apiKey}&units=${units}`;
        break;
      }
      case "currentByCoords": {
        const { lat, lon } = params;
        if (!lat || !lon)
          return json(400, { error: "lat and lon are required" });
        url = `${base}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
        break;
      }
      case "forecastByCoords": {
        const { lat, lon } = params;
        if (!lat || !lon)
          return json(400, { error: "lat and lon are required" });
        url = `${base}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
        break;
      }
      default:
        return json(400, { error: "unknown route" });
    }

    const upstream = await fetch(url);
    const text = await upstream.text();
    const status = upstream.status;
    const headers = {
      "Content-Type":
        upstream.headers.get("content-type") || "application/json",
      "Cache-Control": "public, max-age=120",
      "Access-Control-Allow-Origin": "*",
    };
    return {
      statusCode: status,
      headers,
      body: text,
    };
  } catch (err) {
    return json(500, {
      error: "proxy_error",
      message: String((err && err.message) || err),
    });
  }
};

function json(status, data) {
  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(data),
  };
}
