# Weather Dashboard

A responsive weather app built with React and Vite. Search any city to see the current weather and a 5-day forecast, with a background that changes with the weather.



## Features

- Search weather by city name
- Current temperature, condition, feels-like temperature, humidity and wind speed
- 5-day forecast with weather icons
- Celsius / Fahrenheit toggle
- Recent searches saved in the browser (localStorage)
- Background colour changes with the weather
- Loading indicator and error messages
- Responsive layout for desktop and mobile

## Tech stack

- React (useState, useEffect)
- Vite
- JavaScript (ES6), HTML5, CSS3
- Fetch API
- Open-Meteo API (Geocoding and Forecast), no API key needed

## Getting started

```bash
git clone https://github.com/YOUR-USERNAME/weather-dashboard.git
cd weather-dashboard
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Project structure

```
src/
├── components/
│   ├── SearchBar.jsx
│   ├── SearchHistory.jsx
│   ├── UnitToggle.jsx
│   ├── WeatherCard.jsx
│   └── Forecast.jsx
├── App.jsx
├── App.css
├── index.css
├── utils.js
├── weatherApi.js
└── weatherIcons.js
```

## How it works

1. The city name is sent to the Open-Meteo Geocoding API, which returns its latitude and longitude.
2. The coordinates are sent to the Open-Meteo Forecast API for the current weather and the 5-day forecast.
3. Weather codes are converted into simple conditions (Sunny, Cloudy, Rainy and so on), which choose the icon and the background.

## Credits

Weather data by [Open-Meteo.com](https://open-meteo.com/).