// Converts a Celsius temperature to the chosen unit ("C" or "F")
export function convertTemp(celsius, unit) {
  if (unit === "F") {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return celsius;
}