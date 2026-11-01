import { getIcon } from "../weatherIcons";
import { convertTemp } from "../utils";

function WeatherCard({ weather, unit }) {
  return (
    <section className="weather-card">
      <h2>
        {weather.city}, {weather.country}
      </h2>

      <div className="main-row">
        <span className="icon">{getIcon(weather.condition)}</span>
        <span className="temp">
          {convertTemp(weather.temp, unit)}°{unit}
        </span>
      </div>
      <p className="condition">{weather.condition}</p>

      <div className="details">
        <div className="detail">
          <span className="label">Feels like</span>
          <span className="value">
            {convertTemp(weather.feelsLike, unit)}°{unit}
          </span>
        </div>
        <div className="detail">
          <span className="label">Humidity</span>
          <span className="value">{weather.humidity}%</span>
        </div>
        <div className="detail">
          <span className="label">Wind</span>
          <span className="value">{weather.wind} km/h</span>
        </div>
      </div>
    </section>
  );
}

export default WeatherCard;