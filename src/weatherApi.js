// Talks to the Open-Meteo API (free, no API key needed)

// Turns the weather code from the API into a simple word
function codeToCondition(code) {
  if (code === 0 || code === 1) return "Sunny";
  if (code === 2 || code === 3) return "Cloudy";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 67) return "Rainy";
  if (code >= 71 && code <= 77) return "Snowy";
  if (code >= 80 && code <= 82) return "Rainy";
  if (code >= 85 && code <= 86) return "Snowy";
  if (code >= 95) return "Stormy";
  return "Cloudy";
}

// Gets data from a URL and handles problems
async function fetchJson(url) {
  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error("Network error. Please check your internet connection.");
  }
  if (!response.ok) {
    throw new Error("Could not load weather data. Please try again later.");
  }
  return response.json();
}

export async function getWeather(cityName) {
  // Step 1: city name -> latitude and longitude
  const geoUrl =
    "https://geocoding-api.open-meteo.com/v1/search?name=" +
    encodeURIComponent(cityName) +
    "&count=1&language=en&format=json";
  const geoData = await fetchJson(geoUrl);

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("City not found. Check the spelling and try again.");
  }
  const place = geoData.results[0];

  // Step 2: latitude and longitude -> weather
  const weatherUrl =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    place.latitude +
    "&longitude=" +
    place.longitude +
    "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m" +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min" +
    "&timezone=auto&forecast_days=5";
  const data = await fetchJson(weatherUrl);

  // Current weather
  const current = data.current;
  const weather = {
    city: place.name,
    country: place.country,
    temp: Math.round(current.temperature_2m),
    condition: codeToCondition(current.weather_code),
    feelsLike: Math.round(current.apparent_temperature),
    humidity: current.relative_humidity_2m,
    wind: Math.round(current.wind_speed_10m),
  };

  // 5-day forecast
  const forecast = data.daily.time.map((date, index) => ({
    day: new Date(date + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "short",
    }),
    condition: codeToCondition(data.daily.weather_code[index]),
    max: Math.round(data.daily.temperature_2m_max[index]),
    min: Math.round(data.daily.temperature_2m_min[index]),
  }));

  return { weather, forecast };
}