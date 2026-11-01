// Returns an emoji icon for a weather condition
export function getIcon(condition) {
  switch (condition) {
    case "Sunny":
      return "☀️";
    case "Cloudy":
      return "☁️";
    case "Rainy":
      return "🌧️";
    case "Snowy":
      return "❄️";
    case "Stormy":
      return "⛈️";
    case "Foggy":
      return "🌫️";
    default:
      return "🌤️";
  }
}