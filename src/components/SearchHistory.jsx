function SearchHistory({ cities, onSelect, onClear }) {
  // show nothing if there is no history yet
  if (cities.length === 0) {
    return null;
  }

  return (
    <div className="history">
      <span className="history-label">Recent:</span>
      {cities.map((city) => (
        <button
          type="button"
          className="history-chip"
          key={city}
          onClick={() => onSelect(city)}
        >
          {city}
        </button>
      ))}
      <button type="button" className="history-clear" onClick={onClear}>
        Clear
      </button>
    </div>
  );
}

export default SearchHistory;