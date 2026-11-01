import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import SearchHistory from "./components/SearchHistory";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import UnitToggle from "./components/UnitToggle";
import { getWeather } from "./weatherApi";

// Reads the saved history from the browser (empty list if nothing is saved)
function loadSavedHistory() {
  try {
    const saved = localStorage.getItem("weatherHistory");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
}

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("C"); // "C" or "F"
  const [history, setHistory] = useState(loadSavedHistory);

  // Gets the weather for a city and updates the screen.
  // Returns the city name if it worked, or null if it failed.
  async function loadWeather(cityName) {
    setLoading(true);
    setError("");
    try {
      const data = await getWeather(cityName);
      setWeather(data.weather);
      setForecast(data.forecast);
      setLoading(false);
      return data.weather.city;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  }

  // Puts a city at the start of the history (max 5, no repeats)
  function addToHistory(city) {
    const updated = [city, ...history.filter((item) => item !== city)].slice(0, 5);
    setHistory(updated);
    localStorage.setItem("weatherHistory", JSON.stringify(updated));
  }

  function clearHistory() {
    setHistory([]);
    localStorage.removeItem("weatherHistory");
  }

  // Used when the user searches or clicks a recent city
  async function handleSearch(cityName) {
    const foundCity = await loadWeather(cityName);
    if (foundCity) {
      addToHistory(foundCity);
    }
  }

  // Runs once when the page opens: show Pune by default
  useEffect(() => {
    loadWeather("Pune");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // "Sunny" becomes "sunny". We use it as a CSS class for the background.
  const theme = weather ? weather.condition.toLowerCase() : "";

  return (
    <div className={"page " + theme}>
      <div className="app">
        <div className="top-bar">
          <h1>Weather Dashboard</h1>
          <UnitToggle unit={unit} onChange={setUnit} />
        </div>

        <SearchBar onSearch={handleSearch} />
        <SearchHistory
          cities={history}
          onSelect={handleSearch}
          onClear={clearHistory}
        />

        {loading && <p className="message">Loading weather...</p>}
        {error && <p className="message error">{error}</p>}

        {weather && !loading && (
          <>
            <WeatherCard weather={weather} unit={unit} />
            <Forecast days={forecast} unit={unit} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;