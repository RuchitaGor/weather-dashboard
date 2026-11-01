import { getIcon } from "../weatherIcons";
import { convertTemp } from "../utils";

function Forecast({ days, unit }) {
  return (
    <section className="forecast">
      <h3>5-day forecast</h3>
      <div className="forecast-list">
        {days.map((day) => (
          <div className="forecast-day" key={day.day}>
            <span className="day-name">{day.day}</span>
            <span className="icon">{getIcon(day.condition)}</span>
            <span className="max">{convertTemp(day.max, unit)}°</span>
            <span className="min">{convertTemp(day.min, unit)}°</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Forecast;