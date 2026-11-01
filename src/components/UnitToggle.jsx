function UnitToggle({ unit, onChange }) {
  return (
    <div className="unit-toggle">
      <button
        type="button"
        className={unit === "C" ? "active" : ""}
        onClick={() => onChange("C")}
      >
        °C
      </button>
      <button
        type="button"
        className={unit === "F" ? "active" : ""}
        onClick={() => onChange("F")}
      >
        °F
      </button>
    </div>
  );
}

export default UnitToggle;